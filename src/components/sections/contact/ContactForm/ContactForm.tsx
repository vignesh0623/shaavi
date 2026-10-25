"use client";

import { useState, type FormEvent } from "react";
// Imported from their own modules rather than the index files, so only these
// components end up in the browser bundle.
import { Button } from "@/components/ui/Button/Button";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";
import { Icon } from "@/components/ui/Icon/Icon";
import { PhoneField } from "@/components/ui/PhoneField/PhoneField";
import { TextField } from "@/components/ui/TextField/TextField";
import { contactForm, dialCodes } from "@/content/contact";
import { sendContactMessage } from "@/lib/contact";
import { cx } from "@/lib/cx";
import type { Reveal } from "@/lib/reveal";
import styles from "./ContactForm.module.css";

const EMPTY = {
  firstName: "",
  surname: "",
  email: "",
  age: "",
  dialCode: dialCodes[0].code,
  phone: "",
  message: "",
  whatsapp: false,
};

type Values = typeof EMPTY;
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

/** Fields that can be wrong, in the order they appear (the first gets focus). */
const CHECKED_FIELDS: Field[] = ["firstName", "email", "age", "phone", "message"];

const { fields, errors: messages } = contactForm;

/** Digits of a mobile number, without spaces, brackets or dashes. */
function phoneDigits(phone: string) {
  return phone.replace(/[\s()-]/g, "");
}

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.firstName.trim()) errors.firstName = messages.firstName;

  const email = values.email.trim();
  if (!email) errors.email = messages.email;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = messages.emailFormat;

  const age = values.age.trim();
  if (age && !(/^\d{1,3}$/.test(age) && Number(age) >= 1 && Number(age) <= 120)) {
    errors.age = messages.age;
  }

  const digits = phoneDigits(values.phone);
  if (digits && !/^\d{7,15}$/.test(digits)) errors.phone = messages.phone;
  else if (!digits && values.whatsapp) errors.phone = messages.phoneForWhatsapp;

  if (!values.message.trim()) errors.message = messages.message;
  return errors;
}

/**
 * The Contact Us form. Fields are checked when it is sent (then again as
 * they change), and the first one to fix gets focus. `sendContactMessage`
 * delivers the message (not connected to email yet).
 */
export function ContactForm({
  className,
  "data-reveal": reveal,
}: {
  className?: string;
  "data-reveal"?: Reveal;
}) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  function update<F extends Field>(field: F, value: Values[F]) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (checked) setErrors(validate(next));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setChecked(true);

    const first = CHECKED_FIELDS.find((field) => found[field]);
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    const digits = phoneDigits(values.phone);
    try {
      await sendContactMessage({
        firstName: values.firstName.trim(),
        surname: values.surname.trim(),
        email: values.email.trim(),
        age: values.age.trim(),
        phone: digits ? `${values.dialCode} ${values.phone.trim()}` : "",
        message: values.message.trim(),
        whatsapp: values.whatsapp,
      });
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  function startOver() {
    setValues(EMPTY);
    setErrors({});
    setChecked(false);
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div className={cx(styles.card, styles.sent, className)} data-reveal={reveal}>
        <span className={styles.sentIcon}>
          <Icon name="check" />
        </span>
        {/* Takes focus, so screen readers read the confirmation. */}
        <h2 ref={(heading) => heading?.focus()} tabIndex={-1} className={styles.sentTitle}>
          {contactForm.sent.title}
        </h2>
        <p className={styles.sentText}>{contactForm.sent.description}</p>
        <Button variant="soft" size="sm" onClick={startOver}>
          {contactForm.sent.again}
        </Button>
      </div>
    );
  }

  const field = (name: "firstName" | "surname" | "email" | "age" | "message") => ({
    id: `contact-${name}`,
    name,
    label: fields[name],
    value: values[name],
    error: errors[name],
  });

  return (
    <div className={cx(styles.card, className)} data-reveal={reveal}>
      <form noValidate onSubmit={handleSubmit} className={styles.form} aria-label="Send us a message">
        <div className={styles.fields}>
          <div className={styles.names}>
            <TextField
              {...field("firstName")}
              icon="user"
              autoComplete="given-name"
              onChange={(event) => update("firstName", event.target.value)}
            />
            <TextField
              {...field("surname")}
              icon="user"
              autoComplete="family-name"
              onChange={(event) => update("surname", event.target.value)}
            />
          </div>
          <TextField
            {...field("email")}
            icon="envelope"
            type="email"
            autoComplete="email"
            onChange={(event) => update("email", event.target.value)}
          />
          <TextField
            {...field("age")}
            icon="calendar"
            inputMode="numeric"
            maxLength={3}
            onChange={(event) => update("age", event.target.value)}
          />
          <PhoneField
            id="contact-phone"
            name="phone"
            label={fields.phone}
            value={values.phone}
            error={errors.phone}
            autoComplete="tel-national"
            onChange={(event) => update("phone", event.target.value)}
            codeName="dialCode"
            codeLabel={fields.dialCode}
            codes={dialCodes}
            code={values.dialCode}
            onCodeChange={(code) => update("dialCode", code)}
          />
          <TextField
            {...field("message")}
            icon="messageCircle"
            multiline
            onChange={(event) => update("message", event.target.value)}
          />
          <Checkbox
            name="whatsapp"
            label={fields.whatsapp}
            icon="whatsappColor"
            checked={values.whatsapp}
            onChange={(event) => update("whatsapp", event.target.checked)}
          />
        </div>
        {status === "failed" && (
          <p role="alert" className={styles.failed}>
            {messages.failed}
          </p>
        )}
        <Button
          type="submit"
          variant="primary"
          size="md"
          icon="arrow"
          disabled={status === "sending"}
          className={styles.submit}
        >
          {status === "sending" ? contactForm.sending : contactForm.submit}
        </Button>
      </form>
    </div>
  );
}

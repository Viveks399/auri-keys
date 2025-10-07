import React from "react";

const ContactFormSection: React.FC = () => {
  return (
    <div
      className="w-full dark:bg-background-dark font-display text-[#1C1917] dark:text-background-light relative z-10"
      style={{ backgroundColor: "#f8f7f6" }}
    >
      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
            Contact Us
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Have a question or want to schedule a viewing? Fill out the form and
            one of our experts will be in touch shortly.
          </p>
          <div
            className="aspect-video w-full rounded-lg bg-cover bg-center"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDzq1xZshJyAqcwCgHsR7D9r9I9tMvbH18ghs3qMQkovpiW5NcrJQeLqmZIOtSAw8gXIh1YIz6JWXeZuLDKOrVvfj9HOjivN1HHaCE8rXj1foT49LmvUVSG4JNOyw0WgcVM5Gf6o1KuuiI6rUeCqJBKxzC-IaB8_WWLik-IikNjGkiWp6HAbfo_gLru6d9JmMkgxdGR16pWB6vE98wHPZI09thNdnQvzaWrZgI44ydl5miexhoZftIoFGNfHGcenewZr6lO-kL9ia2d")`,
            }}
          />
        </div>
        <form className="flex flex-col gap-4">
          <input
            className="form-input w-full rounded-lg border-zinc-300 bg-zinc-100 p-4 text-zinc-900 placeholder-zinc-500 focus:border-primary focus:ring-primary dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400"
            placeholder="Your Name"
            type="text"
          />
          <input
            className="form-input w-full rounded-lg border-zinc-300 bg-zinc-100 p-4 text-zinc-900 placeholder-zinc-500 focus:border-primary focus:ring-primary dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400"
            placeholder="Your Email"
            type="email"
          />
          <textarea
            className="form-textarea w-full rounded-lg border-zinc-300 bg-zinc-100 p-4 text-zinc-900 placeholder-zinc-500 focus:border-primary focus:ring-primary dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400"
            placeholder="Your Message"
            rows={5}
          />
          <button
            className="rounded-lg bg-primary px-6 py-3 font-bold text-zinc-900 transition-transform hover:scale-105"
            type="submit"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactFormSection;

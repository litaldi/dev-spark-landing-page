import React from "react";

const testimonials = [
  {
    name: "Samantha H.",
    title: "Frontend Engineer",
    quote: "DevAI gave me the confidence and skills to land my dream job. The personalized challenges and community support made all the difference!",
    image: "/avatars/avatar1.svg",
  },
  {
    name: "Nathan R.",
    title: "Full Stack Developer",
    quote: "I improved faster than I ever thought possible. The built-in code reviews and interactive lessons are game-changers.",
    image: "/avatars/avatar2.svg",
  },
  {
    name: "Lila M.",
    title: "Software Intern",
    quote: "From day one, I felt supported and challenged. Earning badges kept me motivated, and the learning assistant always helped me get unstuck.",
    image: "/avatars/avatar3.svg",
  },
];

const TestimonialCard = () => (
  <>
    {testimonials.map((t, idx) => (
      <div
        key={t.name}
        className="bg-white dark:bg-gray-900/80 rounded-xl p-6 shadow-md border border-border flex flex-col items-center text-center space-y-4 animate-fade-in"
        style={{ animationDelay: `${100 * idx}ms` }}
      >
        <img
          src={t.image}
          alt={`${t.name} avatar`}
          className="w-14 h-14 rounded-full border-2 border-brand-200 dark:border-brand-700 shadow mb-2"
          loading="lazy"
        />
        <blockquote className="italic text-lg text-brand-800 dark:text-brand-100 leading-relaxed">
          “{t.quote}”
        </blockquote>
        <div className="pt-2">
          <span className="font-semibold text-brand-500 dark:text-brand-400">{t.name}</span>
          <span className="block text-xs text-muted-foreground">{t.title}</span>
        </div>
      </div>
    ))}
  </>
);

export default TestimonialCard;

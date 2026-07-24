import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Users, ThumbsUp, Clock } from 'lucide-react';

const stats = [
  { label: 'Security Assessments', value: 100, suffix: '+', icon: Target },
  { label: 'Clients Secured', value: 10, suffix: '+', icon: Users },
  { label: 'Client Satisfaction', value: 99, suffix: '%', icon: ThumbsUp },
  { label: 'Security Support', value: 24, suffix: '/7', icon: Clock },
];

const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = value / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl lg:text-7xl font-black font-sans text-white tracking-tighter">
      {count}
      <span>{suffix}</span>
    </span>
  );
};

export const WhyUs = () => {
  return (
    <section id="why-us" className="py-16 relative z-10 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-2 bg-transparent text-center group"
            >
              <div className="flex items-center gap-2 md:gap-3 lg:gap-4 mb-2">
                <stat.icon className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#D4AF37] drop-shadow-md" strokeWidth={2} />
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-1 text-sm md:text-base text-gray-300 font-medium tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

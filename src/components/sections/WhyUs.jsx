import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Users, ThumbsUp, Clock } from 'lucide-react';

const stats = [
  { label: 'Security Assessments', value: 100, suffix: '+', icon: Target },
  { label: 'Clients Secured', value: 50, suffix: '+', icon: Users },
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
    <span ref={ref} className="text-4xl md:text-5xl font-bold font-space text-white text-glow">
      {count}
      <span className="text-primary">{suffix}</span>
    </span>
  );
};

export const WhyUs = () => {
  return (
    <section id="why-us" className="py-24 relative z-10 bg-background-darker/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-space mb-6 text-white text-glow">
            Why Choose <span className="text-primary">Us</span>
          </h2>
          <p className="text-gray-400">
            We deliver uncompromising security with a proven track record. Our metrics speak for our dedication to your safety.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-8 glass-panel text-center group"
            >
              <div className="mb-4 p-4 rounded-full bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-8 h-8 text-primary group-hover:text-glow transition-all" />
              </div>
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-4 text-sm text-gray-400 font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

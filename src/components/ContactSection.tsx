
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';

interface ContactSectionProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon!",
    });
    reset();
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'kavenneshsec@gmail.com',
      link: 'mailto:kavenneshsec@gmail.com'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Miami, FL',
      link: null
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        {...register('name', { required: 'Name is required' })}
                        placeholder="Your Name"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name.message as string}</p>
                      )}
                    </div>
                    <div>
                      <Input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        placeholder="Your Email"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message as string}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Input
                      {...register('subject', { required: 'Subject is required' })}
                      placeholder="Subject"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-sm mt-1">{errors.subject.message as string}</p>
                    )}
                  </div>
                  
                  <div>
                    <Textarea
                      {...register('message', { required: 'Message is required' })}
                      placeholder="Your Message"
                      rows={6}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">{errors.message.message as string}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gray-700 to-black hover:from-gray-800 hover:to-gray-900 text-white py-3"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                I'm always open to exploring new opportunities, collaborating on security-focused projects,
                 or having insightful conversations about cybersecurity, ethical hacking, and digital defense.
              </p>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-black rounded-full flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{info.title}</h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-gray-300 hover:text-gray-200 transition-colors duration-300"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-gray-300">{info.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-gradient-to-r from-gray-800/30 to-black/30 rounded-2xl p-8 border border-gray-600/30 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
              <p className="text-gray-300 mb-6">
                Let's turn your ideas into reality. I'm here to help you build something amazing.
              </p>
              <a
                href="https://www.linkedin.com/in/kavenneshbv/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-gradient-to-r from-gray-700 to-black hover:from-gray-800 hover:to-gray-900 text-white px-8 py-3">
                  Hire Me Now
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;

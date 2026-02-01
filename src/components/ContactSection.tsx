import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mgozwbrb"; // <-- replace

const ContactSection: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const [isSending, setIsSending] = useState(false);

  const contactInfo = useMemo(
    () => [
      {
        icon: Mail,
        title: "Email",
        value: "kavenneshsec@gmail.com",
        link: "mailto:kavenneshsec@gmail.com",
      },
      {
        icon: MapPin,
        title: "Location",
        value: "Miami, FL",
        link: null as string | null,
      },
    ],
    []
  );

  const onSubmit = async (data: ContactFormValues) => {
    if (!FORMSPREE_ENDPOINT.includes("/f/") || FORMSPREE_ENDPOINT.endsWith("YOUR_FORM_ID")) {
      toast({
        title: "Formspree not configured",
        description: "Replace YOUR_FORM_ID in ContactSection.tsx with your Formspree form ID.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      toast({
        title: "Message Sent!",
        description: "Thanks — I’ll get back to you soon.",
      });
      reset();
    } catch (err) {
      toast({
        title: "Send failed",
        description: "Please try again in a moment, or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative z-10 px-4 py-20">
      <div className="max-w-6xl mx-auto w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs tracking-[0.28em] uppercase text-white/70">
            <ShieldCheck className="h-4 w-4 text-white/60" />
            Contact
          </div>

          <h2 className="mt-6 text-5xl md:text-6xl font-bold text-white">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
              Work Together
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-5 leading-relaxed">
            Have a project in mind? Send a message — I’m open to security-focused collaborations,
            internships, and meaningful conversations about cyber defense.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Card className="bg-white/5 backdrop-blur-md border-white/10 rounded-3xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        {...register("name", { required: "Name is required" })}
                        placeholder="Your Name"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/i,
                            message: "Invalid email address",
                          },
                        })}
                        type="email"
                        placeholder="Your Email"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Input
                      {...register("subject", { required: "Subject is required" })}
                      placeholder="Subject"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Textarea
                      {...register("message", { required: "Message is required" })}
                      placeholder="Your Message"
                      rows={7}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSending}
                    className={[
                      "w-full text-white py-6 rounded-xl",
                      "bg-gradient-to-r from-gray-700 to-black",
                      "hover:from-gray-800 hover:to-gray-900",
                      "disabled:opacity-60 disabled:cursor-not-allowed",
                    ].join(" ")}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>

              <p className="text-gray-300 leading-relaxed mb-8">
                I’m always open to exploring new opportunities, collaborating on security-focused
                projects, or having insightful conversations about cybersecurity, ethical hacking,
                and digital defense.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut", delay: 0.25 + index * 0.08 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-black rounded-full flex items-center justify-center border border-white/10">
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

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
              className="bg-gradient-to-r from-gray-800/30 to-black/30 rounded-3xl p-8 border border-gray-600/30 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-gray-300 mb-6">
                Let’s turn your ideas into reality. I’m here to help you build something amazing.
              </p>

              <a
                href="https://www.linkedin.com/in/kavenneshbv/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-gradient-to-r from-gray-700 to-black hover:from-gray-800 hover:to-gray-900 text-white px-8 py-6 rounded-xl">
                  Hire Me Now
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

import { PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface FAQItem {
  question: string;
  answer: string;
}

function FAQSection() {
  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const faqItems: FAQItem[] = [

    {
      question: "Do I need prior AI/ML experience to participate?",
      answer: "While basic programming knowledge is recommended, we welcome participants at all skill levels. We'll provide mentorship, resources, and workshops to help you build your AI agent solutions."
    },
    {
      question: "What technologies and tools can we use?",
      answer: "You're free to use any AI frameworks, libraries, and tools you prefer. Popular choices include LangChain, AutoGen, CrewAI, TensorFlow, PyTorch, and various LLM APIs. Cloud platforms like Azure, AWS, and GCP are also allowed."
    },
    {
      question: "How will the projects be evaluated?",
      answer: "Projects will be judged on innovation, technical implementation, real-world impact, scalability, presentation quality, and how well they address the problem statement using multi-agent AI architectures."
    },
    {
      question: "Can I use pre-existing code or projects?",
      answer: "While you can use open-source libraries and frameworks, the core AI agent solution must be developed during the hackathon period. All code must be original work created by your team."
    }
  ];

  return (
    <div className="w-full py-20 lg:py-40 bg-gradient-to-b from-slate-950 via-black to-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left Column - Header & CTA */}
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline" className="border-teal-500/50 text-teal-400">
                  FAQ
                </Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-bold text-white">
                  Got Questions?
                  <br />
                  We've Got Answers
                </h4>
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-neutral-400 text-left">
                  Find answers to common questions about the AI Agents Hackathon. 
                  Can't find what you're looking for? Our team is here to help you 
                  every step of the way.
                </p>
              </div>
              <div className="">
                <Button 
                  onClick={handleScrollToBottom}
                  className="gap-4 bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white border-none" 
                  variant="outline"
                >
                  Contact Support <PhoneCall className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={"index-" + index}
                className="border-b border-white/10"
              >
                <AccordionTrigger className="text-white hover:text-teal-400 transition-colors text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-400">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export { FAQSection };

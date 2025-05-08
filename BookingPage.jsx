
import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AppointmentContext } from "@/contexts/AppointmentContext";
import { motion } from "framer-motion";
import { CalendarPlus as CalendarIcon, User, Mail, Phone, Scissors, Clock } from 'lucide-react';
import { format } from "date-fns";

const servicesList = [
  "Women's Haircut & Style",
  "Men's Haircut",
  "Blowout / Styling",
  "All-Over Color",
  "Partial Highlights",
  "Full Highlights",
  "Balayage / Ombre",
  "Deep Conditioning Treatment",
  "Keratin Smoothing Treatment",
  "Eyebrow Shaping",
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

const BookingPage = () => {
  const { addAppointment } = useContext(AppointmentContext);
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !service || !date || !time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email, Service, Date, Time).",
        variant: "destructive",
      });
      return;
    }
    
    const newAppointment = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      service,
      date: format(date, "PPP"),
      time,
      notes,
      status: "Pending" 
    };

    addAppointment(newAppointment);

    toast({
      title: "Appointment Requested!",
      description: `Thank you, ${name}! We've received your request for ${service} on ${format(date, "PPP")} at ${time}. We'll contact you shortly to confirm.`,
      variant: "default",
      duration: 7000,
    });

    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setService("");
    setDate(undefined);
    setTime("");
    setNotes("");
  };

  return (
    <div className="py-12 sm:py-16 bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4">Book Your Appointment</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Schedule your visit with ease. Select your desired service, date, and time, and we'll take care of the rest.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="max-w-2xl mx-auto shadow-2xl border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Appointment Details</CardTitle>
              <CardDescription>Fill out the form below to request your appointment.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center"><User className="mr-2 h-4 w-4 text-primary" />Full Name</Label>
                    <Input id="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center"><Mail className="mr-2 h-4 w-4 text-primary" />Email Address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center"><Phone className="mr-2 h-4 w-4 text-primary" />Phone Number (Optional)</Label>
                  <Input id="phone" type="tel" placeholder="(123) 456-7890" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service" className="flex items-center"><Scissors className="mr-2 h-4 w-4 text-primary" />Select Service</Label>
                  <Select onValueChange={setService} value={service} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a service..." />
                    </SelectTrigger>
                    <SelectContent>
                      {servicesList.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center"><CalendarIcon className="mr-2 h-4 w-4 text-primary" />Preferred Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(day) => day < new Date(new Date().setDate(new Date().getDate()-1)) } // Disable past dates
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="flex items-center"><Clock className="mr-2 h-4 w-4 text-primary" />Preferred Time</Label>
                    <Select onValueChange={setTime} value={time} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time slot..." />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea id="notes" placeholder="Any specific requests or preferences?" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
                 <CardFooter className="p-0 pt-6">
                  <Button type="submit" size="lg" className="w-full text-lg">Request Appointment</Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatedBackButton } from '@/components/ui/animated-back-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProblemStatement {
  id: string;
  ps_code: string;
  title: string;
  team_count: number;
  is_frozen: boolean;
  max_teams: number;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingPS, setFetchingPS] = useState(true);
  const [checkingEmail, setCheckingEmail] = useState(false);
  
  const [formData, setFormData] = useState({
    teamName: '',
    teamLeaderName: '',
    teamLeaderEmail: '',
    institution: '',
    teamMembers: '',
    problemStatementId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);

  // Fetch problem statements on mount
  useEffect(() => {
    fetchProblemStatements();
  }, []);

  const fetchProblemStatements = async () => {
    try {
      // Add cache-busting to always get fresh data
      const response = await fetch(`${API_BASE_URL}/api/problem-statements?t=${Date.now()}`, {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        console.log('Problem Statements loaded:', data.data); // Debug log
        setProblemStatements(data.data);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to load problem statements',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching problem statements:', error);
      toast({
        title: 'Error',
        description: 'Network error. Please check your connection.',
        variant: 'destructive',
      });
    } finally {
      setFetchingPS(false);
    }
  };

  // Debounced email check
  useEffect(() => {
    if (!formData.teamLeaderEmail || !formData.teamLeaderEmail.includes('@')) {
      setEmailAvailable(null);
      return;
    }

    const timer = setTimeout(() => {
      checkEmailAvailability(formData.teamLeaderEmail);
    }, 800);

    return () => clearTimeout(timer);
  }, [formData.teamLeaderEmail]);

  const checkEmailAvailability = async (email: string) => {
    setCheckingEmail(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/teams/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      
      if (data.success) {
        setEmailAvailable(data.data.available);
      }
    } catch (error) {
      console.error('Error checking email:', error);
    } finally {
      setCheckingEmail(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.teamName.trim().length < 3) {
      newErrors.teamName = 'Team name must be at least 3 characters';
    }

    if (formData.teamLeaderName.trim().length < 2) {
      newErrors.teamLeaderName = 'Leader name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.teamLeaderEmail)) {
      newErrors.teamLeaderEmail = 'Please enter a valid email';
    }

    if (emailAvailable === false) {
      newErrors.teamLeaderEmail = 'This email is already registered';
    }

    if (formData.institution.trim().length < 3) {
      newErrors.institution = 'Institution name must be at least 3 characters';
    }

    if (formData.teamMembers.trim().length < 1) {
      newErrors.teamMembers = 'Please provide team member names';
    }

    if (!formData.problemStatementId) {
      newErrors.problemStatementId = 'Please select a problem statement';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/teams/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Success!',
          description: data.message,
          variant: 'default',
        });

        // Immediately refresh problem statements to show updated count
        await fetchProblemStatements();

        // Reset form
        setFormData({
          teamName: '',
          teamLeaderName: '',
          teamLeaderEmail: '',
          institution: '',
          teamMembers: '',
          problemStatementId: '',
        });
        setEmailAvailable(null);

        // Show success and redirect
        setTimeout(() => {
          navigate('/', { 
            state: { 
              registrationSuccess: true,
              teamId: data.data.teamId,
              teamName: data.data.teamName 
            } 
          });
        }, 3000);
      } else {
        toast({
          title: 'Registration Failed',
          description: data.error || data.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Error',
        description: 'Network error. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const availablePS = problemStatements.filter((ps) => !ps.is_frozen);
  const frozenPS = problemStatements.filter((ps) => ps.is_frozen);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <AnimatedBackButton />
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-black pointer-events-none" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Team Registration
            </h1>
            <p className="text-gray-400 text-lg">
              Join AIAgenthon 2026 - Register your team now!
            </p>
          </div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Team Name */}
              <div>
                <Label htmlFor="teamName" className="text-gray-200">
                  Team Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="teamName"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  placeholder="Enter your team name"
                  className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  disabled={loading}
                />
                {errors.teamName && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.teamName}
                  </p>
                )}
              </div>

              {/* Team Leader Name */}
              <div>
                <Label htmlFor="teamLeaderName" className="text-gray-200">
                  Team Leader Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="teamLeaderName"
                  name="teamLeaderName"
                  value={formData.teamLeaderName}
                  onChange={handleChange}
                  placeholder="Enter team leader's name"
                  className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  disabled={loading}
                />
                {errors.teamLeaderName && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.teamLeaderName}
                  </p>
                )}
              </div>

              {/* Team Leader Email */}
              <div>
                <Label htmlFor="teamLeaderEmail" className="text-gray-200">
                  Team Leader Email <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="teamLeaderEmail"
                    name="teamLeaderEmail"
                    type="email"
                    value={formData.teamLeaderEmail}
                    onChange={handleChange}
                    placeholder="leader@example.com"
                    className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-500 pr-10"
                    disabled={loading}
                  />
                  {checkingEmail && (
                    <Loader2 className="w-5 h-5 animate-spin absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  )}
                  {!checkingEmail && emailAvailable === true && formData.teamLeaderEmail && (
                    <CheckCircle2 className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-green-400" />
                  )}
                  {!checkingEmail && emailAvailable === false && (
                    <AlertCircle className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-red-400" />
                  )}
                </div>
                {errors.teamLeaderEmail && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.teamLeaderEmail}
                  </p>
                )}
              </div>

              {/* Institution */}
              <div>
                <Label htmlFor="institution" className="text-gray-200">
                  Institution <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="Enter your institution name"
                  className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  disabled={loading}
                />
                {errors.institution && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.institution}
                  </p>
                )}
              </div>

              {/* Team Members */}
              <div>
                <Label htmlFor="teamMembers" className="text-gray-200">
                  Team Members <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="teamMembers"
                  name="teamMembers"
                  value={formData.teamMembers}
                  onChange={handleChange}
                  placeholder="Enter team member names separated by commas (e.g., Alice, Bob, Charlie)"
                  className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-[100px]"
                  disabled={loading}
                />
                <p className="text-gray-500 text-xs mt-1">
                  Separate multiple names with commas
                </p>
                {errors.teamMembers && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.teamMembers}
                  </p>
                )}
              </div>

              {/* Problem Statement Selection */}
              <div>
                <Label htmlFor="problemStatementId" className="text-gray-200">
                  Problem Statement <span className="text-red-400">*</span>
                </Label>
                <Select
                  value={formData.problemStatementId}
                  onValueChange={(value) => {
                    setFormData((prev) => ({ ...prev, problemStatementId: value }));
                    if (errors.problemStatementId) {
                      setErrors((prev) => ({ ...prev, problemStatementId: '' }));
                    }
                  }}
                  disabled={loading || fetchingPS}
                >
                  <SelectTrigger className="mt-2 bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select a problem statement" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/10">
                    {fetchingPS ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : (
                      <>
                        {availablePS.length > 0 ? (
                          availablePS.map((ps) => (
                            <SelectItem
                              key={ps.id}
                              value={ps.id}
                              className="text-white hover:bg-white/10"
                            >
                              <div className="flex flex-col">
                                <span className="font-semibold">[{ps.ps_code}] {ps.title}</span>
                                <span className="text-sm text-gray-400">
                                  {ps.team_count}/{ps.max_teams} teams registered
                                </span>
                              </div>
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="none" disabled>
                            No available problem statements
                          </SelectItem>
                        )}
                        
                        {frozenPS.length > 0 && (
                          <>
                            <div className="px-2 py-1.5 text-xs text-gray-500 font-semibold">
                              Full (Not Available)
                            </div>
                            {frozenPS.map((ps) => (
                              <SelectItem
                                key={ps.id}
                                value={ps.id}
                                disabled
                                className="text-gray-500 opacity-50"
                              >
                                {ps.ps_code} - FULL ({ps.team_count}/{ps.max_teams})
                              </SelectItem>
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </SelectContent>
                </Select>
                {errors.problemStatementId && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.problemStatementId}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || checkingEmail || emailAvailable === false}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-6 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Registering...
                  </>
                ) : (
                  'Register Team'
                )}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;

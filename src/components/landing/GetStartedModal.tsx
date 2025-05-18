
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoginModal from "@/components/auth/LoginModal";

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAction = (action: 'login' | 'signup' | 'dashboard') => {
    if (action === 'login') {
      setLoginModalOpen(true);
    } else if (action === 'signup') {
      navigate("/auth/register");
      onClose();
    } else if (action === 'dashboard') {
      navigate("/dashboard");
      onClose();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md" aria-labelledby="get-started-title">
          <DialogHeader>
            <DialogTitle id="get-started-title" className="text-2xl font-bold text-center">Get Started</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col gap-4 py-4">
            <Button 
              variant="outline" 
              className="w-full justify-center text-base py-6"
              onClick={() => handleAction('login')}
            >
              Log in
            </Button>
            
            <Button 
              className="w-full justify-center text-base py-6 bg-brand-500 hover:bg-brand-600 text-white"
              onClick={() => handleAction('signup')}
            >
              Sign up
            </Button>
            
            <Button 
              variant="secondary"
              className="w-full justify-center text-base py-6"
              onClick={() => handleAction('dashboard')}
            >
              Visit Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
};

export default GetStartedModal;

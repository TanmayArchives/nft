import React, { useState } from 'react';
import { Button } from './ui/button';
import { api } from '../services/api';
import { useToast } from "@/components/ui/use-toast"

interface FollowButtonProps {
  username: string;
  initialStatus?: string;
  isPrivate: boolean;
  onFollowChange?: (newStatus: string) => void;
}

export function FollowButton({ 
  username, 
  initialStatus, 
  isPrivate,
  onFollowChange 
}: FollowButtonProps) {
  const [status, setStatus] = useState(initialStatus || 'none');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFollowAction = async () => {
    try {
      setLoading(true);
      
      if (status === 'none' || status === 'rejected') {
        const response = await api.followUser(username);
        const newStatus = isPrivate ? 'pending' : 'accepted';
        setStatus(newStatus);
        onFollowChange?.(newStatus);
        
        toast({
          title: isPrivate ? 'Follow request sent' : 'Following user',
          description: isPrivate ? 
            'Waiting for user to accept your request' : 
            `You are now following ${username}`,
        });
      } else {
        await api.unfollowUser(username);
        setStatus('none');
        onFollowChange?.('none');
        
        toast({
          title: 'Unfollowed user',
          description: `You are no longer following ${username}`,
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update follow status',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    switch (status) {
      case 'accepted':
        return 'Following';
      case 'pending':
        return 'Requested';
      case 'rejected':
        return 'Follow';
      default:
        return 'Follow';
    }
  };

  return (
    <Button
      onClick={handleFollowAction}
      disabled={loading}
      variant={status === 'accepted' ? 'secondary' : 'default'}
      className="w-24"
    >
      {loading ? 'Loading...' : getButtonText()}
    </Button>
  );
} 
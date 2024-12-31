import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to register company');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto p-4 md:p-8">
                <div className="my-6">
                    <h1 className="font-bold text-xl md:text-2xl">Your Company Name</h1>
                    <p className="text-gray-500 text-sm md:text-base">
                        What would you like to name your company? You can change this later.
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <Label>Company Name</Label>
                        <Input
                            type="text"
                            className="my-2 w-full p-2 border rounded-md"
                            placeholder="JobHunt, Microsoft, etc."
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 my-8">
                 
                    <Button
                        className="w-full md:w-auto"
                        onClick={registerNewCompany}
                    >
                        Continue
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full md:w-auto"
                        onClick={() => navigate('/admin/companies')}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;

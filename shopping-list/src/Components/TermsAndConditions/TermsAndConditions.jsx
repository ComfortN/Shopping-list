import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';


export default function TermsAndConditions({  open, onClose, onAccept }) {

    const handleAccept = () => {
        if (onAccept) {
            onAccept();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Terms and Conditions</DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" gutterBottom>
                    Introduction
                </Typography>
                
                <Typography variant="body1" paragraph>
                    Welcome to the Shopping List App. By accessing or using our App, you agree to comply with and be bound by the following terms and conditions.
                    Please read them carefully before using the App.
                </Typography>
                
                <Typography variant="h6" gutterBottom>1. Acceptance of Terms</Typography>
                <Typography variant="body2" paragraph>
                    By creating an account, accessing, or using the App, you agree to be bound by these Terms.
                    If you do not agree to these Terms, you must not use the App.
                </Typography>

                <Typography variant="h6" gutterBottom>2. User Accounts</Typography>
                <Typography variant="body2" paragraph>
                    - **Registration**: To use certain features of the App, you may be required to register and create an account.
                    You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                </Typography>
                <Typography variant="body2" paragraph>
                    - **Eligibility**: You must be at least 18 years old to use the App.
                    By registering, you represent and warrant that you are of legal age to form a binding contract.
                </Typography>
                <Typography variant="body2" paragraph>
                    - **Account Security**: You are responsible for maintaining the security of your account.
                    You agree to notify us immediately of any unauthorized use of your account or any other security breach.
                </Typography>

                
                
                <Typography variant="h6" gutterBottom>3. Use of the App</Typography>
                <Typography variant="body2" paragraph>
                    - **Personal Use**: The App is intended for your personal use only.
                    You may not use the App for any commercial purpose without our express written consent.
                </Typography>
                <Typography variant="body2" paragraph>
                    - **Prohibited Conduct**: You agree not to use the App in a manner that violates any applicable law,
                    infringes on the rights of others, or interferes with the operation of the App.
                </Typography>

        

                <Typography variant="h6" gutterBottom>14. Disclaimers and Limitation of Liability</Typography>
                <Typography variant="body2" paragraph>
                    - **No Warranty**: The App is provided on an "as is" and "as available" basis.
                    We disclaim all warranties, whether express or implied, including but not limited to the implied warranties of merchantability,
                    fitness for a particular purpose, and non-infringement.
                </Typography>
                <Typography variant="body2" paragraph>
                    - **Limitation of Liability**: To the fullest extent permitted by law, we will not be liable for any indirect,
                    incidental, special, consequential, or punitive damages,
                    or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use,
                    goodwill, or other intangible losses, resulting from your use of the App.
                </Typography>

                <Typography variant="h6" gutterBottom>17. Contact Information</Typography>
                <Typography variant="body2" paragraph>
                    If you have any questions about these Terms, please contact us at shoppinglist@app.com.
                </Typography>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleAccept} color="primary">
                    Accept
                </Button>
            </DialogActions>
        </Dialog>
    )
}

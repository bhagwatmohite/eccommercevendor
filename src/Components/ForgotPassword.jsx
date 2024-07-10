import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [otp, setOtp] = useState('');
  const [emailError, setEmailError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [resendEnabled, setResendEnabled] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    const timer = setTimeout(() => {
      setResendEnabled(true);
    }, 60000); // 60000 milliseconds = 1 minute

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://13.201.255.228:8080/forgotpassword',
        { email }
      );

      if (response.status === 200) {
        alert(`OTP sent to ${email}`);
        localStorage.setItem('email', email); // Store email in local storage
        setIsSubmitted(true);
      } else {
        setEmailError('Please enter a registered email.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setEmailError("you are not registered with this email");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://13.201.255.228:8080/verifyotp',
        { otp }
      );

      if (response.status === 200 && response.data === 'OTP verified successfully') {
        alert('OTP verified successfully');
        setIsOtpVerified(true);
      } else {
        alert(response.data);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('An error occurred while verifying OTP. Please try again later.');
      setOtpError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);

    try {
      const response = await axios.post('http://13.201.255.228:8080/forgotpassword', { email });

      if (response.status === 200) {
        alert(`OTP resent to ${email}`);
      } else {
        setEmailError('Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      setEmailError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://13.201.255.228:8080/changepassword', { email, newPassword });

      if (response.status === 200) {
        alert('Password has been reset successfully.');
        // Redirect to login page or any other desired action
        navigate('/');

      } else {
        setPasswordError('Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setPasswordError('An error occurred. Please try again later.');
      setOtpError('Invalid otp Provided....');
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    if (!validateEmail(value) && value.length > 0) {
      setEmailError('Invalid email. Please enter a correct email format.');
    } else {
      setEmailError('');
    }
  };

  const handleOtpChange = (e) => {
    const { value } = e.target;
    setOtp(value);
    setOtpError('');
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordError('');
  };

  return (
    <div className="py-5">
      <Card className="p-4 mx-auto" style={{ width: '500px', display: 'flex', justifyContent: 'center' }}>
        <Card.Body>
          {!isSubmitted ? (
            <>
              <Card.Title className="text-center mb-4">Forgot Password</Card.Title>
              <Card.Text className="text-center mb-4">
                Enter your email to reset your password
              </Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  {emailError && <small className="text-danger">{emailError}</small>}
                </Form.Group>
                <Button type="submit" variant="primary" style={{ display: 'block', margin: '0 auto', marginTop: '15px' }} disabled={loading}>
                  {loading ? 'Sending...' : 'Send OTP'}
                </Button>
              </Form>
            </>
          ) : (
            <>
              {!isOtpVerified ? (
                <>
                  <Card.Title className="text-center mb-4">Enter OTP</Card.Title>
                  <Card.Text className="text-center mb-4">
                    OTP sent to {email}
                  </Card.Text>
                  <Form onSubmit={handleOtpSubmit}>
                    <Form.Group controlId="otp">
                      <Form.Label>Enter OTP: </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={handleOtpChange}
                        required
                      />
                      {otpError && <small className="text-danger">{otpError}</small>}
                    </Form.Group>
                    <div className="text-center mb-3">
                      <Button variant="link" onClick={handleResendOTP} disabled={!resendEnabled}>
                        Resend OTP
                      </Button>
                    </div>
                    <Button type="submit" variant="primary" block disabled={loading} style={{ display: 'block', margin: '0 auto', marginTop: '15px' }}>
                      {loading ? 'Verifying...' : 'Verify OTP'}
                    </Button>
                  </Form>
                </>
              ) : (
                <>
                  <Card.Title className="text-center mb-4">Reset Password</Card.Title>
                  <Form onSubmit={handlePasswordSubmit}>
                    <Form.Group controlId="newPassword">
                      <Form.Label>New Password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        required
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="confirmPassword">
                      <Form.Label>Confirm New Password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter Confirm new password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                      />
                      {passwordError && <small className="text-danger">{passwordError}</small>}
                    </Form.Group>
                    <Button type="submit" variant="primary" block disabled={loading} style={{ display: 'block', margin: '0 auto', marginTop: '15px' }}>
                      {loading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                  </Form>
                </>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ForgotPassword;

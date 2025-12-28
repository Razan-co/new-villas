// ✅ HELPER FUNCTION - Handles MongoDB ObjectId safely
const getBookingRef = (bookingId) => {
    if (!bookingId) return 'N/A';
    return bookingId.toString().slice(-6).toUpperCase();
};

// Customer Confirmation Email Template
const customerConfirmationTemplate = (booking) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmed 🎉</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
        
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3); margin-top: 40px; margin-bottom: 40px;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Booking Confirmed! 🎉</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.95; font-size: 16px;">Your villa stay is reserved</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
            
            <!-- Check Icon -->
            <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 80px; height: 80px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <span style="font-size: 36px;">✅</span>
            </div>
            </div>

            <!-- Booking Details -->
            <div style="background: #f8fafc; border-radius: 16px; padding: 30px; margin-bottom: 30px; border-left: 5px solid #10b981;">
            <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 22px;">Your Stay Details</h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div>
                <p style="color: #64748b; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">Check-in</p>
                <p style="font-size: 18px; font-weight: 600; color: #1e293b; margin: 0;">${formatDate(booking.checkIn)}</p>
                </div>
                <div>
                <p style="color: #64748b; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">Check-out</p>
                <p style="font-size: 18px; font-weight: 600; color: #1e293b; margin: 0;">${formatDate(booking.checkOut)}</p>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                <p style="color: #64748b; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">Guests</p>
                <p style="font-size: 18px; font-weight: 600; color: #1e293b; margin: 0;">${booking.persons || 0} person${(booking.persons || 0) > 1 ? 's' : ''}</p>
                </div>
                <div>
                <p style="color: #64748b; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">Nights</p>
                <p style="font-size: 18px; font-weight: 600; color: #1e293b; margin: 0;">${booking.days || 0}</p>
                </div>
            </div>
            </div>

            <!-- Total Amount -->
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 16px; padding: 25px; text-align: center; color: white; margin-bottom: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; opacity: 0.9;">Total Amount</p>
            <p style="margin: 0; font-size: 32px; font-weight: 700;">₹${(booking.price || 0).toLocaleString('en-IN')}</p>
            </div>

            <!-- Next Steps -->
            <div style="background: #fef3c7; border-radius: 12px; padding: 20px; border-left: 4px solid #f59e0b;">
            <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 18px;">📞 Next Steps</h3>
            <p style="margin: 0; color: #92400e; line-height: 1.6;">
                Our team will call you on <strong>${booking.phone || 'your registered number'}</strong> within 24 hours to confirm final details and assist with any special requests.
            </p>
            </div>

        </div>

        <!-- Footer -->
        <div style="background: #f1f5f9; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; margin: 0 0 10px 0; font-size: 14px;">
            Booking Reference: <strong>#${getBookingRef(booking._id)}</strong>
            </p>
            <p style="color: #64748b; margin: 0; font-size: 12px;">
            Need help? Reply to this email or call us anytime.
            </p>
        </div>
        </div>
    </body>
    </html>`;
};

// Resort Owner Notification Template
const ownerNotificationTemplate = (booking) => {
    const formatDateShort = (date) => {
        return new Date(date).toLocaleDateString('en-GB');
    };

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Booking Received 🏡</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); min-height: 100vh;">
        
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3); margin-top: 40px; margin-bottom: 40px;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 40px 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 700;">New Booking Alert! 🏡</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.95; font-size: 16px;">Guest reservation received</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
            
            <!-- Bell Icon -->
            <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 80px; height: 80px; background: #ef4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <span style="font-size: 36px;">🔔</span>
            </div>
            </div>

            <!-- Guest Info -->
            <div style="background: #fef2f2; border-radius: 16px; padding: 25px; margin-bottom: 25px; border-left: 5px solid #ef4444;">
            <h3 style="margin: 0 0 15px 0; color: #dc2626; font-size: 20px;">Guest Information</h3>
            <p style="margin: 0 0 10px 0;"><strong>${booking.fullName || 'N/A'}</strong></p>
            <p style="margin: 0 0 10px 0;"><strong>📧 ${booking.email || 'N/A'}</strong></p>
            <p style="margin: 0 0 20px 0;"><strong>📞 ${booking.phone || 'N/A'}</strong></p>
            </div>

            <!-- Stay Details -->
            <div style="background: #f0fdf4; border-radius: 16px; padding: 25px; margin-bottom: 25px; border-left: 5px solid #10b981;">
            <h3 style="margin: 0 0 15px 0; color: #166534; font-size: 20px;">Stay Details</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                <p style="color: #64748b; font-size: 14px; margin: 0 0 5px 0;">Check-in</p>
                <p style="font-weight: 600; color: #166534;">${formatDateShort(booking.checkIn)}</p>
                </div>
                <div>
                <p style="color: #64748b; font-size: 14px; margin: 0 0 5px 0;">Check-out</p>
                <p style="font-weight: 600; color: #166534;">${formatDateShort(booking.checkOut)}</p>
                </div>
            </div>
            <p style="margin: 15px 0 0 0;"><strong>${booking.days || 0} nights • ${booking.persons || 0} guests</strong></p>
            </div>

            <!-- Revenue -->
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 16px; padding: 25px; text-align: center; color: white; margin-bottom: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; opacity: 0.9;">Expected Revenue</p>
            <p style="margin: 0; font-size: 32px; font-weight: 700;">₹${(booking.price || 0).toLocaleString('en-IN')}</p>
            </div>

        </div>

        <!-- Footer -->
        <div style="background: #f8fafc; padding: 25px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; margin: 0 0 10px 0; font-size: 14px;">
            Booking ID: <strong>#${getBookingRef(booking._id)}</strong> | Status: <strong>Pending</strong>
            </p>
            <p style="color: #94a3b8; margin: 0; font-size: 12px;">
            Please contact guest to confirm booking details
            </p>
        </div>
        </div>
    </body>
    </html>`;
};

const customerCancelTemplate = (booking) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Cancelled ❌</title>
</head>
<body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 10px;">
    
    <!--[if mso]>
    <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width: 600px;">
    <tr>
    <td style="padding: 10px;">
    <![endif]-->
    
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 30px 20px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700; line-height: 1.3;">Booking Cancelled ❌</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.95; font-size: 15px;">Reservation #${getBookingRef(booking._id)} has been cancelled</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px 20px;">
            
            <!-- Cancel Icon -->
            <div style="text-align: center; margin-bottom: 25px;">
                <div style="width: 70px; height: 70px; background: #fee2e2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 32px;">
                    ❌
                </div>
            </div>

            <!-- Booking Details -->
            <div style="background: #fef2f2; border-radius: 16px; padding: 25px 20px; margin-bottom: 25px; border-left: 5px solid #ef4444;">
                <h2 style="margin: 0 0 20px 0; color: #dc2626; font-size: 20px; line-height: 1.3;">Cancelled Stay Details</h2>
                
                <div style="display: block; width: 100%;">
                    <div style="margin-bottom: 15px;">
                        <p style="color: #64748b; font-size: 14px; margin: 0 0 5px 0; font-weight: 500;">Check-in</p>
                        <p style="font-size: 16px; font-weight: 600; color: #dc2626; margin: 0;">${formatDate(booking.checkIn)}</p>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <p style="color: #64748b; font-size: 14px; margin: 0 0 5px 0; font-weight: 500;">Check-out</p>
                        <p style="font-size: 16px; font-weight: 600; color: #dc2626; margin: 0;">${formatDate(booking.checkOut)}</p>
                    </div>
                </div>

                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    <div style="flex: 1; min-width: 120px;">
                        <p style="color: #64748b; font-size: 14px; margin: 0 0 5px 0; font-weight: 500;">Guests</p>
                        <p style="font-size: 16px; font-weight: 600; color: #dc2626;">${booking.persons || 0} person${(booking.persons || 0) > 1 ? 's' : ''}</p>
                    </div>
                    <div style="flex: 1; min-width: 80px;">
                        <p style="color: #64748b; font-size: 14px; margin: 0 0 5px 0; font-weight: 500;">Nights</p>
                        <p style="font-size: 16px; font-weight: 600; color: #dc2626;">${booking.days || 0}</p>
                    </div>
                </div>
            </div>

            <!-- Amount -->
            <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); border-radius: 16px; padding: 20px; text-align: center; color: white; margin-bottom: 25px;">
                <p style="margin: 0 0 8px 0; font-size: 14px; opacity: 0.9;">Amount (Cancelled)</p>
                <p style="margin: 0; font-size: 28px; font-weight: 700;">₹${(booking.price || 0).toLocaleString('en-IN')}</p>
            </div>

            <!-- Next Steps -->
            <div style="background: #fef3c7; border-radius: 12px; padding: 20px; border-left: 4px solid #f59e0b;">
                <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">Next Steps</h3>
                <p style="margin: 0; color: #92400e; line-height: 1.5; font-size: 14px;">
                    You can create a new booking anytime. Contact us if you need assistance.
                </p>
            </div>

        </div>

        <!-- Footer -->
        <div style="background: #f8fafc; padding: 25px 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; margin: 0 0 10px 0; font-size: 14px;">
                Booking Reference: <strong>#${getBookingRef(booking._id)}</strong>
            </p>
            <p style="color: #64748b; margin: 0; font-size: 12px;">
                Need help? Reply to this email or call us anytime.
            </p>
        </div>
    </div>
    
    <!--[if mso]>
    </td>
    </tr>
    </table>
    <![endif]-->
</body>
</html>`;
};

// ✅ NEW: Owner Cancellation Notification (RESPONSIVE)
const ownerCancelTemplate = (booking) => {
    const formatDateShort = (date) => {
        return new Date(date).toLocaleDateString('en-GB');
    };

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Cancelled 🚫</title>
</head>
<body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); min-height: 100vh; padding: 10px;">
    
    <!--[if mso]>
    <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width: 600px;">
    <tr>
    <td style="padding: 10px;">
    <![endif]-->
    
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 30px 20px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700; line-height: 1.3;">Booking Cancelled 🚫</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.95; font-size: 15px;">Guest cancelled reservation</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px 20px;">
            
            <!-- Cancel Icon -->
            <div style="text-align: center; margin-bottom: 25px;">
                <div style="width: 70px; height: 70px; background: #fee2e2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 32px;">
                    ❌
                </div>
            </div>

            <!-- Guest Info -->
            <div style="background: #fef2f2; border-radius: 16px; padding: 20px; margin-bottom: 20px; border-left: 5px solid #ef4444;">
                <h3 style="margin: 0 0 15px 0; color: #dc2626; font-size: 18px;">Guest Details</h3>
                <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>${booking.fullName || 'N/A'}</strong></p>
                <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>📧 ${booking.email || 'N/A'}</strong></p>
                <p style="margin: 0 0 15px 0; font-size: 14px;"><strong>📞 ${booking.phone || 'N/A'}</strong></p>
            </div>

            <!-- Stay Details -->
            <div style="background: #f0fdf4; border-radius: 16px; padding: 20px; margin-bottom: 20px; border-left: 5px solid #10b981;">
                <h3 style="margin: 0 0 15px 0; color: #166534; font-size: 18px;">Cancelled Stay</h3>
                <div style="display: block;">
                    <div style="margin-bottom: 10px;">
                        <p style="color: #64748b; font-size: 14px; margin: 0 0 5px 0;">Check-in</p>
                        <p style="font-weight: 600; color: #166534;">${formatDateShort(booking.checkIn)}</p>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <p style="color: #64748b; font-size: 14px; margin: 0 0 5px 0;">Check-out</p>
                        <p style="font-weight: 600; color: #166534;">${formatDateShort(booking.checkOut)}</p>
                    </div>
                </div>
                <p style="margin: 10px 0 0 0; font-size: 14px;"><strong>${booking.days || 0} nights • ${booking.persons || 0} guests</strong></p>
            </div>

            <!-- Revenue Impact -->
            <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); border-radius: 16px; padding: 20px; text-align: center; color: white; margin-bottom: 25px;">
                <p style="margin: 0 0 8px 0; font-size: 14px; opacity: 0.9;">Revenue Impact</p>
                <p style="margin: 0; font-size: 28px; font-weight: 700;">-₹${(booking.price || 0).toLocaleString('en-IN')}</p>
            </div>

        </div>

        <!-- Footer -->
        <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; margin: 0 0 10px 0; font-size: 14px;">
                Booking ID: <strong>#${getBookingRef(booking._id)}</strong> | Status: <strong>Cancelled</strong>
            </p>
            <p style="color: #94a3b8; margin: 0; font-size: 12px;">
                Guest cancelled within 24 hours of booking
            </p>
        </div>
    </div>
    
    <!--[if mso]>
    </td>
    </tr>
    </table>
    <![endif]-->
</body>
</html>`;
};

module.exports = {
    customerConfirmationTemplate,
    ownerNotificationTemplate,
    customerCancelTemplate,
    ownerCancelTemplate,
};
# Admin Dashboard - Quick Reference Guide

## 📊 Dashboard Overview

### Top Section
```
┌─────────────────────────────────────────────────────────────┐
│  BOSSCARS Admin Dashboard              [Back to Home]       │
└─────────────────────────────────────────────────────────────┘

┌────────────┐  ┌────────────┐  ┌────────────┐
│ 📊 Total   │  │ ⏳ Pending │  │ ✅ Confirmed│
│    X       │  │    Y       │  │    Z        │
└────────────┘  └────────────┘  └────────────┘
```

### Control Panel
```
┌─────────────────────────────────────────────────────────────┐
│ Search: [____________]  Sort By: [______]  Filter: [______] │
│         Type to search   Date/Time/etc    All/Pending/etc   │
└─────────────────────────────────────────────────────────────┘
```

### Booking Cards
```
┌─────────────────────────────────────────────────────────────┐
│ 🚗 Booking #123                     [Pending]               │
│    Created: Oct 28, 2025, 7:00 PM                           │
│                                                              │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│ │ Route    │ │ Date/Time│ │ Mobile   │ │ Vehicle  │       │
│ │ 📍 From  │ │ 📅 Date  │ │ 📞 Phone │ │ Type     │       │
│ │ 📍 To    │ │ 🕐 Time  │ │ 📧 Email │ │          │       │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                                                              │
│                         [✓ Confirm & Send SMS] [✗ Delete]   │
└─────────────────────────────────────────────────────────────┘
```

## 🔍 Search Examples

- Search by location: "Mumbai" or "Pune"
- Search by mobile: "9876543210"
- Search by ID: "1" or "123"
- Search by email: "john@example.com" (if provided)

## 📋 Sort Options

1. **Booking Date & Time** ⭐ (Default)
   - Shows bookings in order of their journey date/time
   - Earliest journeys first

2. **Created Date (Newest First)**
   - Shows recently created bookings first
   - Good for managing new requests

3. **Status**
   - Groups pending and confirmed bookings
   - Pending bookings appear first

4. **Time Only**
   - Sorts by journey time regardless of date
   - Useful for time-based scheduling

## 🏷️ Status Filter

- **All Bookings**: Shows everything (default)
- **Pending Only**: Focus on bookings needing confirmation
- **Confirmed Only**: View completed confirmations

## ✅ Actions

### Confirm Booking
1. Find a pending booking
2. Click "✓ Confirm & Send SMS"
3. Alert shows: "✅ Booking confirmed! SMS sent to customer."
4. Status changes to "Confirmed" (green badge)
5. SMS logged in backend console
6. "Confirmed At" timestamp added

### Delete Booking
1. Click "✗ Delete" on any booking
2. Confirm in dialog: "Are you sure you want to delete this booking?"
3. Booking is permanently removed
4. List updates automatically

## 📱 SMS Notifications

### Backend Console Output:
```
📱 SMS Sent to 9876543210:
Dear Customer, your car booking from Mumbai to Pune on 2025-11-01 
at 10:00 has been CONFIRMED! Thank you for choosing BOSSCARS!
```

### When SMS is Sent:
- ✅ Customer submits new booking
- ✅ Admin confirms a pending booking

## 🎨 Visual Indicators

### Status Badges:
- 🟡 Yellow = Pending
- 🟢 Green = Confirmed

### Vehicle Types:
- 🚗 = Car
- 🚌 = Bus

### Information Icons:
- 📍 = Location (Green = Pickup, Red = Drop)
- 📅 = Date
- 🕐 = Time
- 📞 = Mobile (Required)
- 📧 = Email (Optional)

## 💡 Tips & Tricks

1. **Quickly find pending bookings**: Set filter to "Pending Only"

2. **See newest requests first**: Sort by "Created Date"

3. **Search by partial text**: Type "Mum" to find "Mumbai"

4. **Empty search resets**: Clear search box to show all

5. **Check backend console**: SMS logs appear in terminal running backend

6. **Combine filters**: Use search + filter + sort together

## ⚠️ Important Notes

- Mobile number is REQUIRED for all bookings
- Email is OPTIONAL (may not be present)
- SMS currently logs to console (ready for real SMS API)
- All actions update in real-time
- Deleted bookings cannot be recovered

## 🚀 Workflow Example

### Morning Routine:
1. Open admin dashboard
2. Check statistics at top
3. Sort by "Created Date" to see new bookings
4. Review pending bookings
5. Confirm bookings one by one (customers get SMS)
6. Delete any spam/invalid bookings

### During the Day:
1. Use search to find specific customer bookings
2. Filter by status as needed
3. Sort by booking date/time for scheduling

### End of Day:
1. Filter to "Confirmed Only"
2. Review all confirmed bookings
3. Prepare for next day

---

## 🆘 Troubleshooting

**Q: Bookings not showing?**  
A: Check if backend is running on port 5000

**Q: SMS not appearing?**  
A: Check backend console/terminal for SMS logs

**Q: Search not working?**  
A: Clear filters and try again

**Q: Can't confirm booking?**  
A: Make sure booking status is "Pending"

---

**Happy Managing! 🎉**

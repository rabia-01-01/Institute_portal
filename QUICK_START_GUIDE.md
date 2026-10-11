# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### For First-Time Users

#### Step 1: Register as Admin
1. Click "Register" in the top navigation
2. Select "Admin" role
3. Fill in your details:
   - Full Name
   - Email
   - Password (min 6 characters)
4. Click "Create Account"
5. You'll be automatically approved and redirected to login
6. Login with your credentials

#### Step 2: Create Your First Department
1. After login, you'll see the Admin Dashboard
2. Click on "Departments" tab
3. Click "Add Department" button
4. Fill in:
   - **Name**: e.g., "Computer Science"
   - **Code**: e.g., "CS"
   - **Description**: Brief description of the department
5. Click "Add Department"
6. ✅ Department created successfully!

#### Step 3: Register Faculty Members
1. Share the registration link with faculty
2. Faculty registers with "Faculty" role
3. Go to "Users" tab in Admin Dashboard
4. You'll see pending faculty approvals
5. Click the green checkmark ✓ to approve
6. Click "Assign Dept" dropdown and select their department
7. ✅ Faculty is now active and assigned!

#### Step 4: Create Courses
**As Admin:**
1. Go to "Courses" tab
2. Click "Add Course"
3. Fill in:
   - Course Code: e.g., "CS101"
   - Course Name: e.g., "Introduction to Programming"
   - Department: Select from dropdown
   - Batch: e.g., 2024
   - Credits: e.g., 3
   - Faculty: Select assigned faculty (optional)
   - Description: Course description
4. Click "Add Course"

**As Faculty:**
1. Login to Faculty Dashboard
2. Go to "Add Course" tab
3. Fill in course details (automatically assigned to your department)
4. Click "Create Course"

#### Step 5: Register & Enroll Students
1. Students register with "Student" role
2. Admin approves student accounts (Users tab)
3. Go to "Students" tab
4. Click on student name
5. Select course from dropdown
6. Click "Enroll"
7. ✅ Student enrolled!

#### Step 6: Upload Resources (Faculty)
1. Faculty logs in
2. Go to "Upload" tab
3. Fill in:
   - Title: Resource name
   - Course: Select from dropdown
   - Type: PDF/Notes/Assignment/Question Paper/Video
   - Description: Brief description
   - File: Click to upload (PDF, DOCX, or MP4, max 500MB)
4. Click "Upload Resource"
5. Resource is pending admin approval

#### Step 7: Approve Resources (Admin)
1. Admin logs in
2. Go to "Resources" tab
3. See pending resources
4. Click green checkmark ✓ to approve
5. ✅ Students can now access the resource!

---

## 📋 Quick Reference

### Admin Can Do:
- ✅ Create departments
- ✅ Create courses (any department)
- ✅ Approve users (faculty & students)
- ✅ Assign departments to faculty
- ✅ Enroll students in courses
- ✅ Approve resources
- ✅ Publish announcements
- ✅ Create calendar events
- ✅ Delete anything (with confirmation)

### Faculty Can Do:
- ✅ Create courses (own department only)
- ✅ Upload resources
- ✅ Publish announcements
- ✅ Create calendar events
- ✅ View students in their courses
- ❌ Cannot delete anything
- ❌ Cannot approve users/resources

### Student Can Do:
- ✅ View enrolled courses
- ✅ View approved resources
- ✅ View announcements
- ✅ View calendar events
- ❌ Cannot create or modify anything

---

## 🔧 Troubleshooting

### "I can't add courses as faculty"
**Problem**: Faculty doesn't have a department assigned
**Solution**: Admin must assign department in Users tab

### "Students can't see resources"
**Problem**: Resources need admin approval
**Solution**: Admin must approve resources in Resources tab

### "I lost my data"
**Problem**: Browser localStorage was cleared
**Solution**: Data is stored in browser. Clearing browser data resets everything. This is expected for demo.

### "I can't login"
**Problem**: Account not approved or wrong credentials
**Solution**: 
- Admin accounts are auto-approved
- Faculty/Student need admin approval
- Check email and password

---

## 💡 Tips

1. **Start with Admin**: Always register as admin first to set up the system
2. **Create Departments First**: Departments are required before creating courses
3. **Assign Departments**: Faculty must have departments before adding courses
4. **Approve Users**: Faculty and students need approval before they can login
5. **Enroll Students**: Students must be enrolled in courses to see them
6. **Approve Resources**: Resources need approval before students can access
7. **Use Announcements**: Keep everyone informed with announcements
8. **Add Calendar Events**: Important dates should be in the calendar

---

## 🎯 Example Setup

Here's a complete example setup:

1. **Admin**: John Smith (john@admin.edu)
2. **Departments**: 
   - Computer Science (CS)
   - Mathematics (MATH)
   - Physics (PHY)
3. **Faculty**:
   - Dr. Sarah Johnson (CS department)
   - Dr. Michael Chen (MATH department)
4. **Courses**:
   - CS101: Introduction to Programming (Batch 2024, 3 credits)
   - MATH201: Calculus II (Batch 2024, 4 credits)
5. **Students**:
   - Alice Johnson (enrolled in CS101)
   - Bob Smith (enrolled in MATH201)
6. **Resources**:
   - CS101 Lecture Notes (PDF, approved)
   - MATH201 Assignment 1 (PDF, pending)

---

## 📞 Need Help?

If you encounter issues:
1. Check the SYSTEM_DOCUMENTATION.md for detailed information
2. Verify you have the correct role and permissions
3. Ensure departments are created before courses
4. Ensure faculty have departments assigned
5. Ensure students are enrolled in courses
6. Ensure resources are approved

---

**Remember**: All data is saved automatically to your browser. No manual save needed! ✅

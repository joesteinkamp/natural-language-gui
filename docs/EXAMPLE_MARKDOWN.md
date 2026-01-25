# Example Markdown Templates

Copy and paste these templates into the Markdown → GUI mode to see them rendered as interactive components.

## Simple Login Form

```
*Email:* user@example.com
*Password:* mypassword
*Remember me:* yes
[Login] [Forgot Password]
```

**Expected Components**:
- Email: Input
- Password: Input
- Remember me: Switch
- Buttons: Login, Forgot Password

---

## User Profile Form

```
*First Name:* John
*Last Name:* Doe
*Email:* john.doe@example.com
*Bio:* I'm a software engineer passionate about building great user experiences. I love working with React, TypeScript, and modern web technologies.
*Birth Date:* January 15, 1990
*Notifications:* yes
[Save Profile] [Cancel]
```

**Expected Components**:
- First Name, Last Name, Email: Input (< 60 chars)
- Bio: Textarea (> 60 chars)
- Birth Date: Date Picker
- Notifications: Switch
- Buttons: Save Profile, Cancel

---

## Settings Panel with Toggle Group

```
*Username:* johndoe
*Export Formats:*
- *PDF:* yes
- *DOCX:* no
- *XLSX:* yes
- *PPTX:* no
*Auto-save:* yes
[Save Settings]
```

**Expected Components**:
- Username: Input
- Export Formats: ToggleGroup (bulleted yes/no list)
- Auto-save: Switch
- Button: Save Settings

---

## Radio Group Example (< 6 options)

```
*Product Name:* Premium Plan

*Plan Type:*
- Basic
- Pro
- Enterprise

*Billing Cycle:*
- Monthly
- Quarterly
- Annually

[Continue] [Back]
```

**Expected Components**:
- Product Name: Input
- Plan Type: RadioGroup (3 options < 6)
- Billing Cycle: RadioGroup (3 options < 6)
- Buttons: Continue, Back

---

## Select Example (>= 6 options)

```markdown
*Full Name:* Jane Smith
*Country:*
- United States
- Canada
- Mexico
- United Kingdom
- France
- Germany
- Spain
*Language:*
- English
- Spanish
- French
- German
- Italian
- Portuguese
- Russian
- Chinese
[Submit]
```

**Expected Components**:
- Full Name: Input
- Country: Select (7 options >= 6)
- Language: Select (8 options >= 6)
- Button: Submit

---

## Checkbox Examples

```markdown
*Terms:*
- I accept the terms and conditions
- I agree to the privacy policy
- Subscribe to newsletter
*Payment Method:*
- Credit Card
- PayPal
- Bank Transfer
[Complete Purchase]
```

**Expected Components**:
- Terms: RadioGroup or CheckboxGroup (3 items)
- Payment Method: RadioGroup (3 items)
- Button: Complete Purchase

---

## Mixed Form with All Component Types

```
*Email:* admin@company.com

*Short Description:* This is a brief note

*Long Description:* This is a very detailed description that exceeds 60 characters and therefore should be rendered as a textarea component instead of a regular input field. It contains multiple sentences with lots of information.

*Event Date:* February 14, 2024

*Date Range:* February 1, 2024 - February 28, 2024

*Active:* yes

*Notifications:* no

*Severity:*
- *Critical:* yes
- *Warning:* yes
- *Info:* no

*Priority:*
- Low
- Medium
- High

*Department:*
- Engineering
- Marketing
- Sales
- Support
- Operations
- Finance
- HR

Enable two-factor authentication

[Save] [Cancel] [Reset]
```

**Expected Components**:
1. Email: Input (short)
2. Short Description: Input (< 60 chars)
3. Long Description: Textarea (>= 60 chars)
4. Event Date: Date Picker
5. Date Range: Date Range Picker
6. Active: Switch
7. Notifications: Switch
8. Severity: ToggleGroup (yes/no values)
9. Priority: RadioGroup (3 options < 6)
10. Department: Select (7 options >= 6)
11. Enable two-factor authentication: Checkbox
12. Buttons: Save, Cancel, Reset

---

## Edge Cases

### Exactly 60 Characters

```markdown
*Threshold Test:* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Should render as **Textarea** (exactly 60 chars = threshold)

### Exactly 6 Options

```
*Six Options:*
- Option 1
- Option 2
- Option 3
- Option 4
- Option 5
- Option 6
```

Should render as **Select** (6 options = threshold)

### Empty Values

```
*Empty Field:*
*Empty Switch:* no
```

Should render:
- Empty Field: Input with empty value
- Empty Switch: Switch (unchecked)

---

## Type Hints (Override Inference)

```
*Short Text [textarea]:* Hi
*Country [radiogroup]:* USA
*Many Options [select]:*
- A
- B
- C
```

**Expected**:
- Short Text: Textarea (explicit hint overrides < 120 rule)
- Country: RadioGroup (single value with hint)
- Many Options: Select (explicit hint with 3 options)

---

## Testing Guide

1. **Copy any template above**
2. **Switch to "Markdown → GUI" mode** in the viewer
3. **Paste into the markdown textarea**
4. **Observe rendered components** in the preview panel
5. **Verify component types** match expectations
6. **Interact with components** to test functionality

---

## Common Patterns

### Registration Form
```
*Full Name:*
*Email:*
*Password:*
*Confirm Password:*
*Country:*
- Select country
I agree to the terms
[Create Account]
```

### Feedback Form
```
*Name:*
*Email:*
*Subject:*
*Message:*
*Rating:*
- Poor
- Fair
- Good
- Excellent
[Send Feedback]
```

### Survey Form
```
*How did you hear about us:*
- Social Media
- Search Engine
- Friend
- Advertisement
- Other
*Would you recommend us:* yes
*Additional Comments:*
[Submit Survey]
```

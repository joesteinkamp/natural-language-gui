# Usage Examples

This document provides concrete examples of using NLI-enabled components in various scenarios.

## Table of Contents

1. [Basic Forms](#basic-forms)
2. [Settings Panels](#settings-panels)
3. [Multi-Step Forms](#multi-step-forms)
4. [Complex Data Entry](#complex-data-entry)
5. [Action Sequences](#action-sequences)
6. [Grouped Controls](#grouped-controls)

## Basic Forms

### Login Form

**Component Code**:
```tsx
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          nli-markdown="Email"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          nli-markdown="Password"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="remember" nli-markdown="Remember me" />
        <Label htmlFor="remember">Remember me</Label>
      </div>

      <Button nli-markdown="Sign In" type="submit">
        Sign In
      </Button>
    </form>
  )
}
```

**Generated Markdown** (after user fills form):
```markdown
*Email:* user@example.com
*Password:* ••••••••
Remember me
Sign In
```

---

### Contact Form

**Component Code**:
```tsx
export function ContactForm() {
  return (
    <form className="space-y-4">
      <Input
        nli-markdown="Name"
        placeholder="Your name"
      />

      <Input
        nli-markdown="Email"
        type="email"
        placeholder="your@email.com"
      />

      <Select>
        <SelectTrigger nli-markdown="Subject">
          <SelectValue placeholder="Select subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="general">General Inquiry</SelectItem>
          <SelectItem value="support">Support</SelectItem>
          <SelectItem value="sales">Sales</SelectItem>
        </SelectContent>
      </Select>

      <Textarea
        nli-markdown="Message"
        placeholder="Your message..."
      />

      <Button nli-markdown="Send Message">
        Send Message
      </Button>
    </form>
  )
}
```

**Generated Markdown**:
```markdown
*Name:* John Doe
*Email:* john@example.com
*Subject:* Support
*Message:* I need help with my account settings. Can someone assist?
Send Message
```

---

## Settings Panels

### Appearance Settings

**Component Code**:
```tsx
export function AppearanceSettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3>Theme</h3>

        <RadioGroup defaultValue="dark" nli-group-label="Theme">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="light"
              id="light"
              nli-markdown="*Theme:* Light"
            />
            <Label htmlFor="light">Light</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="dark"
              id="dark"
              nli-markdown="*Theme:* Dark"
            />
            <Label htmlFor="dark">Dark</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="system"
              id="system"
              nli-markdown="*Theme:* System"
            />
            <Label htmlFor="system">System</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="animations">Animations</Label>
          <p className="text-sm text-muted-foreground">
            Enable interface animations
          </p>
        </div>
        <Switch id="animations" nli-markdown="Animations" />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="reduced-motion">Reduced Motion</Label>
          <p className="text-sm text-muted-foreground">
            Minimize animations for accessibility
          </p>
        </div>
        <Switch id="reduced-motion" nli-markdown="Reduced Motion" />
      </div>

      <Button nli-markdown="Save Changes">Save Changes</Button>
    </div>
  )
}
```

**Generated Markdown**:
```markdown
*Theme:* Dark
*Animations:* yes
*Reduced Motion:* no
Save Changes
```

---

### Notification Settings

**Component Code**:
```tsx
export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="notifications">Enable Notifications</Label>
        <Switch id="notifications" nli-markdown="Notifications" defaultChecked />
      </div>

      <div className="space-y-2">
        <Label>Notification Types</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="email-notif" nli-markdown="Email notifications" />
            <Label htmlFor="email-notif">Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="push-notif" nli-markdown="Push notifications" />
            <Label htmlFor="push-notif">Push</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="sms-notif" nli-markdown="SMS notifications" />
            <Label htmlFor="sms-notif">SMS</Label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="sound">Notification Sound</Label>
        <Switch id="sound" nli-markdown="Notification Sound" />
      </div>

      <Button nli-markdown="Update Preferences">
        Update Preferences
      </Button>
    </div>
  )
}
```

**Generated Markdown**:
```markdown
*Notifications:* yes
Email notifications
Push notifications
*Notification Sound:* no
Update Preferences
```

---

## Multi-Step Forms

### User Onboarding (Step 1: Profile)

**Component Code**:
```tsx
export function ProfileStep() {
  return (
    <div className="space-y-4">
      <h2>Create Your Profile</h2>

      <Input nli-markdown="First Name" placeholder="First name" />
      <Input nli-markdown="Last Name" placeholder="Last name" />
      <Input nli-markdown="Username" placeholder="@username" />

      <Textarea
        nli-markdown="Bio"
        placeholder="Tell us about yourself..."
      />

      <div className="flex gap-2">
        <Button variant="outline" nli-markdown="Back">Back</Button>
        <Button nli-markdown="Next">Next</Button>
      </div>
    </div>
  )
}
```

**Generated Markdown**:
```markdown
*First Name:* Jane
*Last Name:* Smith
*Username:* @janesmith
*Bio:* Product designer passionate about user experience.
Next
```

---

### User Onboarding (Step 2: Preferences)

**Component Code**:
```tsx
export function PreferencesStep() {
  return (
    <div className="space-y-4">
      <h2>Set Your Preferences</h2>

      <div>
        <Label>Interests</Label>
        <CheckboxGroup nli-group-label="Interests">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckboxGroupItem value="tech" id="tech" nli-markdown="Technology" />
              <Label htmlFor="tech">Technology</Label>
            </div>
            <div className="flex items-center space-x-2">
              <CheckboxGroupItem value="design" id="design" nli-markdown="Design" />
              <Label htmlFor="design">Design</Label>
            </div>
            <div className="flex items-center space-x-2">
              <CheckboxGroupItem value="business" id="business" nli-markdown="Business" />
              <Label htmlFor="business">Business</Label>
            </div>
          </div>
        </CheckboxGroup>
      </div>

      <div className="flex items-center justify-between">
        <Label>Weekly Newsletter</Label>
        <Switch nli-markdown="Newsletter" />
      </div>

      <div className="flex gap-2">
        <Button variant="outline" nli-markdown="Back">Back</Button>
        <Button nli-markdown="Complete">Complete</Button>
      </div>
    </div>
  )
}
```

**Generated Markdown**:
```markdown
*Interests:*
- Technology
- Design
*Newsletter:* yes
Complete
```

---

## Complex Data Entry

### Product Configuration

**Component Code**:
```tsx
export function ProductConfig() {
  return (
    <div className="space-y-6">
      <Input nli-markdown="Product Name" />

      <Select>
        <SelectTrigger nli-markdown="Category">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="clothing">Clothing</SelectItem>
          <SelectItem value="books">Books</SelectItem>
        </SelectContent>
      </Select>

      <Input nli-markdown="Price" type="number" placeholder="0.00" />

      <Textarea nli-markdown="Description" />

      <div>
        <Label>Features</Label>
        <ToggleGroup type="multiple" nli-group-label="Features">
          <ToggleGroupItem value="wifi" nli-markdown="WiFi">
            WiFi
          </ToggleGroupItem>
          <ToggleGroupItem value="bluetooth" nli-markdown="Bluetooth">
            Bluetooth
          </ToggleGroupItem>
          <ToggleGroupItem value="waterproof" nli-markdown="Waterproof">
            Waterproof
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-center justify-between">
        <Label>In Stock</Label>
        <Switch nli-markdown="In Stock" />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="featured" nli-markdown="Featured product" />
        <Label htmlFor="featured">Featured product</Label>
      </div>

      <Button nli-markdown="Save Product">Save Product</Button>
    </div>
  )
}
```

**Generated Markdown**:
```markdown
*Product Name:* Wireless Headphones
*Category:* Electronics
*Price:* 99.99
*Description:* High-quality wireless headphones with noise cancellation.
*Features:*
- *WiFi:* no
- *Bluetooth:* yes
- *Waterproof:* yes
*In Stock:* yes
Featured product
Save Product
```

---

### Event Creation

**Component Code**:
```tsx
export function EventForm() {
  return (
    <div className="space-y-4">
      <Input nli-markdown="Event Name" />

      <div className="grid grid-cols-2 gap-4">
        <DatePicker nli-markdown="Start Date" />
        <DatePicker nli-markdown="End Date" />
      </div>

      <Input nli-markdown="Location" placeholder="Where?" />

      <Select>
        <SelectTrigger nli-markdown="Event Type">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="conference">Conference</SelectItem>
          <SelectItem value="workshop">Workshop</SelectItem>
          <SelectItem value="meetup">Meetup</SelectItem>
        </SelectContent>
      </Select>

      <Textarea nli-markdown="Description" />

      <div>
        <Label>Options</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="virtual" nli-markdown="Virtual event" />
            <Label htmlFor="virtual">Virtual event</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="recording" nli-markdown="Record session" />
            <Label htmlFor="recording">Record session</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="paid" nli-markdown="Paid event" />
            <Label htmlFor="paid">Paid event</Label>
          </div>
        </div>
      </div>

      <Button nli-markdown="Create Event">Create Event</Button>
    </div>
  )
}
```

**Generated Markdown**:
```markdown
*Event Name:* React Conference 2024
*Start Date:* 2024-06-15
*End Date:* 2024-06-17
*Location:* San Francisco, CA
*Event Type:* Conference
*Description:* Annual conference for React developers featuring talks and workshops.
Virtual event
Record session
Create Event
```

---

## Action Sequences

### Document Editor Actions

**Component Code**:
```tsx
export function DocumentToolbar() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button variant="outline" nli-markdown="New">New</Button>
        <Button variant="outline" nli-markdown="Open">Open</Button>
        <Button variant="outline" nli-markdown="Save">Save</Button>
      </div>

      <div>
        <Label>Formatting</Label>
        <ToggleGroup type="multiple" nli-group-label="Formatting">
          <ToggleGroupItem value="bold" nli-markdown="Bold">
            <FontBoldIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" nli-markdown="Italic">
            <FontItalicIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" nli-markdown="Underline">
            <UnderlineIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" nli-markdown="Undo">Undo</Button>
        <Button variant="outline" nli-markdown="Redo">Redo</Button>
      </div>

      <div className="flex gap-2">
        <Button nli-markdown="Export">Export</Button>
        <Button variant="destructive" nli-markdown="Delete">Delete</Button>
      </div>
    </div>
  )
}
```

**Generated Markdown** (showing user actions):
```markdown
New
*Formatting:*
- *Bold:* yes
- *Italic:* no
- *Underline:* yes
Save
Export
```

---

## Grouped Controls

### File Export Options

**Component Code**:
```tsx
export function ExportDialog() {
  return (
    <div className="space-y-4">
      <Input nli-markdown="File Name" defaultValue="document" />

      <div>
        <Label>Export Formats</Label>
        <ToggleGroup type="multiple" nli-group-label="Export Formats">
          <ToggleGroupItem value="pdf" nli-markdown="PDF">
            PDF
          </ToggleGroupItem>
          <ToggleGroupItem value="docx" nli-markdown="DOCX">
            DOCX
          </ToggleGroupItem>
          <ToggleGroupItem value="txt" nli-markdown="TXT">
            TXT
          </ToggleGroupItem>
          <ToggleGroupItem value="html" nli-markdown="HTML">
            HTML
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <Label>Include</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="toc" nli-markdown="Table of contents" />
            <Label htmlFor="toc">Table of contents</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="images" nli-markdown="Images" />
            <Label htmlFor="images">Images</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="comments" nli-markdown="Comments" />
            <Label htmlFor="comments">Comments</Label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label>Compress Files</Label>
        <Switch nli-markdown="Compress" />
      </div>

      <div className="flex gap-2">
        <Button variant="outline" nli-markdown="Cancel">Cancel</Button>
        <Button nli-markdown="Export">Export</Button>
      </div>
    </div>
  )
}
```

**Generated Markdown**:
```markdown
*File Name:* my-document
*Export Formats:*
- *PDF:* yes
- *DOCX:* yes
- *TXT:* no
- *HTML:* no
Table of contents
Images
*Compress:* yes
Export
```

---

### Permission Manager

**Component Code**:
```tsx
export function PermissionManager() {
  return (
    <div className="space-y-6">
      <Input nli-markdown="User Email" type="email" />

      <div>
        <Label>Role</Label>
        <RadioGroup defaultValue="viewer">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="owner" id="owner" nli-markdown="*Role:* Owner" />
            <Label htmlFor="owner">Owner</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="editor" id="editor" nli-markdown="*Role:* Editor" />
            <Label htmlFor="editor">Editor</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="viewer" id="viewer" nli-markdown="*Role:* Viewer" />
            <Label htmlFor="viewer">Viewer</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>Permissions</Label>
        <ToggleGroup type="multiple" nli-group-label="Permissions">
          <ToggleGroupItem value="read" nli-markdown="Read">
            Read
          </ToggleGroupItem>
          <ToggleGroupItem value="write" nli-markdown="Write">
            Write
          </ToggleGroupItem>
          <ToggleGroupItem value="delete" nli-markdown="Delete">
            Delete
          </ToggleGroupItem>
          <ToggleGroupItem value="share" nli-markdown="Share">
            Share
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-center justify-between">
        <Label>Notify User</Label>
        <Switch nli-markdown="Notify" defaultChecked />
      </div>

      <Button nli-markdown="Add User">Add User</Button>
    </div>
  )
}
```

**Generated Markdown**:
```markdown
*User Email:* colleague@example.com
*Role:* Editor
*Permissions:*
- *Read:* yes
- *Write:* yes
- *Delete:* no
- *Share:* yes
*Notify:* yes
Add User
```

---

## Integration Examples

### AI Form Generation Concept

Imagine an AI assistant receiving this markdown:

```markdown
*Project Name:* Website Redesign
*Priority:* High
*Team Size:* 5
*Budget:* 50000
*Start Date:* 2024-02-01
Requires approval
Confidential
Create Project
```

The AI could:
1. Parse the markdown
2. Identify component types (inputs, selects, checkboxes)
3. Generate the form UI
4. Pre-populate with values
5. Render for user review

### Voice Interface Concept

User says: "Set dark mode to yes and enable notifications"

System:
1. Parses natural language
2. Maps to markdown format:
   ```markdown
   *Dark Mode:* yes
   *Notifications:* yes
   ```
3. Finds matching components
4. Updates their state
5. Confirms: "Dark mode enabled and notifications turned on"

### State Persistence

Save form state as readable markdown:

```typescript
// Save
const markdown = generateMarkdown();
localStorage.setItem('form-state', markdown);

// Restore (future parser)
const markdown = localStorage.getItem('form-state');
const formState = parseMarkdown(markdown);
renderForm(formState);
```

---

## Tips for Writing Examples

1. **Be Realistic**: Use real-world scenarios
2. **Show Complete Forms**: Include all necessary fields
3. **Demonstrate Patterns**: Show different component types
4. **Include Context**: Add labels and descriptions
5. **Show Output**: Always include generated markdown
6. **Consider UX**: Examples should be usable forms

## Next Steps

- See [COMPONENT_AUTHORING.md](./COMPONENT_AUTHORING.md) for creating components
- See [NLI_SPECIFICATION.md](./NLI_SPECIFICATION.md) for markdown format details
- See [ARCHITECTURE.md](./ARCHITECTURE.md) for system design

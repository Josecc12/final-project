
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"


export function RecipeForm() {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Medical History</CardTitle>
        <CardDescription>Patient information and medical details.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="John Doe" readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" defaultValue="35" readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Input id="gender" defaultValue="Male" readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" defaultValue="2024-08-02" readOnly />
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symptoms">Symptoms</Label>
            <Textarea id="symptoms" defaultValue="Headache, fever, cough" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="treatment">Treatment</Label>
            <Textarea id="treatment" defaultValue="Prescribed antibiotics, recommended rest" />
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="medications">Medications</Label>
              <div className="grid gap-4">
                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                
                  <Input type="number" defaultValue="500" className="w-24" />
                  <Button variant="outline" size="icon">
                    <PlusIcon className="h-4 w-4" />
                    <span className="sr-only">Add medication</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" defaultValue="Patient reported improvement after 3 days" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline">Print</Button>
        <Button className="ml-2">Save</Button>
      </CardFooter>
    </Card>
  )
}



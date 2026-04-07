import {
  Button,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Input, Label, Badge, Separator,
  Tabs, TabsList, TabsTrigger, TabsContent,
} from '@fireside/components'

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-6 space-y-12">
      <section>
        <h1 className="text-3xl font-bold mb-2">Fireside Playground</h1>
        <p className="text-muted-foreground">Component showcase with live tokens.</p>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Badges</h2>
        <div className="flex gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Card</h2>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Example Card</CardTitle>
            <CardDescription>This card uses semantic tokens from the design system.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Submit</Button>
          </CardFooter>
        </Card>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Tabs</h2>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="text-sm text-muted-foreground p-4">Overview content here.</p>
          </TabsContent>
          <TabsContent value="analytics">
            <p className="text-sm text-muted-foreground p-4">Analytics content here.</p>
          </TabsContent>
          <TabsContent value="reports">
            <p className="text-sm text-muted-foreground p-4">Reports content here.</p>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}

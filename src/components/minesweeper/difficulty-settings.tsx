"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  rows: z.coerce.number().min(5).max(30),
  cols: z.coerce.number().min(5).max(50),
  mines: z.coerce.number().min(1),
}).refine(data => data.mines < data.rows * data.cols, {
  message: "Number of mines must be less than the total number of cells.",
  path: ["mines"],
});

export type GameSettings = z.infer<typeof formSchema>;

interface DifficultySettingsProps {
  onSettingsChange: (settings: GameSettings) => void;
  defaultSettings: GameSettings;
}

const presets: { name: string; settings: GameSettings }[] = [
  { name: "Beginner", settings: { rows: 9, cols: 9, mines: 10 } },
  { name: "Intermediate", settings: { rows: 16, cols: 16, mines: 40 } },
  { name: "Expert", settings: { rows: 16, cols: 30, mines: 99 } },
];

export function DifficultySettings({ onSettingsChange, defaultSettings }: DifficultySettingsProps) {
  const form = useForm<GameSettings>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultSettings,
  });

  function onSubmit(values: GameSettings) {
    onSettingsChange(values);
  }

  const handlePreset = (settings: GameSettings) => {
    form.reset(settings);
    onSettingsChange(settings);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Game Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          {presets.map((preset) => (
            <Button
              key={preset.name}
              variant="outline"
              onClick={() => handlePreset(preset.settings)}
            >
              {preset.name}
            </Button>
          ))}
        </div>
        <Separator className="mb-6" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="rows"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rows</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cols"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Columns</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mines"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mines</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto">Start New Game</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

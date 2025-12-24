import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function NewsletterPage() {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <div className="flex flex-col gap-6 items-center justify-center md:p-2">
        <h1 className="text-[#333] font-bold text-xl md:text-4xl max-w-150 w-full text-center">Inglês para quem não tem tempo de aprender inglês.</h1>
        <Card className="w-full max-w-md">
          <CardContent>
            <form>
              <FieldGroup>
                <Field>
                  <Input
                    id="small-form-email"
                    placeholder="Seu email principal"
                    type="email"
                    required
                  />
                </Field>
                <Field orientation="horizontal">
                  <Button className="w-full cursor-pointer" type="submit">
                    Submit
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

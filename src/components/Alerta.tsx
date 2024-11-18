import { TextEffect } from "./motion-ui/text-effect";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export function Alerta() {
  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex space-x-2">
            <TextEffect per="char" preset="fade">
              Seja bem-vindo(a) a interface da Freire.app
            </TextEffect>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Fique a vontade para explorar as funcionalidades disponíveis, em
            casos de dúvidas, entre na aba de ajuda.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

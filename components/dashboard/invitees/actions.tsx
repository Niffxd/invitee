"use client";

import { useState } from "react";
import { deleteInvitee } from "@/helpers";
import { showToast } from "@/components/toast";
import { AlertCircle, Check, Pencil, Trash2, Ellipsis } from "lucide-react";

export const ActionsCell = ({
  inviteeId,
  name,
  onDeleted,
}: {
  inviteeId: string;
  name: string;
  onDeleted?: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteInvitee = async () => {
    setLoading(true);
    try {
      await deleteInvitee(inviteeId);

      showToast({
        text: "Invitado borrado exitosamente",
        variant: "success",
        icon: <Check />,
        description: `${name} ha sido eliminado de la lista`,
      });

      onDeleted?.();

    } catch (error) {
      console.error("Error deleting invitee:", error);
      showToast({
        text: "Error al borrar invitado",
        variant: "danger",
        icon: <AlertCircle />,
        description: "Ocurrió un error. Por favor, intenta de nuevo",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Pencil className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteInvitee();
        }}
      >
        {loading ? <Ellipsis className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
      </button>
    </div>
  );
};

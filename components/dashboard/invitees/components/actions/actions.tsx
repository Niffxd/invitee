"use client";

import { useState } from "react";
import { AlertCircle, Check, Pencil, Trash2, Ellipsis } from "lucide-react";
import { deleteInvitee, showToast } from "@/helpers";
import { InviteesActionsCellProps } from "./types";

export const InviteesActionsCell = ({
  inviteeId,
  name,
  onDeleted,
}: InviteesActionsCellProps) => {
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
    <div className="flex items-center gap-2 py-3 px-3">
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

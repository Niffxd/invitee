const productionPath = "https://invitee-ivan.vercel.app";
const developmentPath = "http://localhost:3000";

export const invitationText = "Holaaa te invitamos a celebrar nuestro cumpleaños\n\nHice una app para que puedas confirmar tu asistencia, ahí mismo se encuentran los detalles!\nLink: ";

export const invitationPath = `${process.env.NODE_ENV === "production"
  ? productionPath
  : developmentPath
  }/?inviteeId=`;
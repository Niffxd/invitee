const productionPath = "https://invitee-nico.vercel.app";
const developmentPath = "http://localhost:3000";

export const invitationText = "Buenas! Espero estés bien! Voy a festejar mi cumpleaños y me gustaría que estés ahí!\n\nHice una app para que puedas confirmar tu asistencia, ahí mismo se encuentran los detalles, espero que te guste!\nLink: ";

export const invitationPath = `${process.env.NODE_ENV === "production"
  ? productionPath
  : developmentPath
  }/?inviteeId=`;
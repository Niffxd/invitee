import { CalendarFold, Clock4, MapPinHouse } from "lucide-react";
import { Card } from "./components";

export const Schedule = () => {
  return (
    <div className="relative p-6">
      <div className="relative max-w-xl mx-auto space-y-3">
        {/* Single Column Layout */}
        <div className="space-y-3">
          {/* Date Card */}
          <Card
            title="Fecha"
            description="Sábado 25 de Abril de 2026"
            icon={<CalendarFold className="size-6 text-accent" strokeWidth={2} />}
            className="animate-slide-in-up"
          />

          {/* Time Card */}
          <Card
            title="Horario"
            description="22:00 hs - 06:00 hs."
            icon={<Clock4 className="size-6 text-accent" strokeWidth={2} />}
            className="animate-slide-in-up"
          />

          {/* Location Card */}
          <Card
            title="Ubicación"
            description="Pcia. de Corrientes 3369, San Miguel de Tucumán"
            icon={<MapPinHouse className="size-6 text-accent" strokeWidth={2} />}
            className="animate-slide-in-up"
          >
            {/* Map Preview */}
            <div className="mt-3 rounded-xl overflow-hidden border border-border/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1780.405913416981!2d-65.24547142565338!3d-26.814119661590116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225cfbe9d80ce3%3A0x9cf1b6619f9f57b6!2sPcia%20de%20Corrientes%203369%2C%20T4000EDO%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1sen!2sar!4v1775616875416!5m2!1sen!2sar"
                width="100%"
                height="200px"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

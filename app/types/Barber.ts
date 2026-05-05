export type WorkingHours = {
  dayOfWeek: number;
  start: string;
  end: string;
};

export interface Barber {
  id: string;
  barbershopId: string;

  name: string;
  photoURL?: string;

  services: string[];

  workingHours: WorkingHours[];

  createdAt: Date;
}

export type ICreateCourierUseCaseInputDto = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date | null;
}
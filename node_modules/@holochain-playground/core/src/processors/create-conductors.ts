import { BootstrapService } from '../bootstrap/bootstrap-service';
import { Conductor } from '../core/conductor';
import { SimulatedDnaTemplate } from '../dnas/simulated-dna';

export async function createConductors(
  conductorsToCreate: number,
  currentConductors: Conductor[],
  dnaTemplate: SimulatedDnaTemplate
): Promise<Conductor[]> {
  const bootstrapService =
    currentConductors.length === 0
      ? new BootstrapService()
      : currentConductors[0].network.bootstrapService;

  const newConductorsPromises: Promise<Conductor>[] = [];
  for (let i = 0; i < conductorsToCreate; i++) {
    const conductor = Conductor.create(bootstrapService);
    newConductorsPromises.push(conductor);
  }

  const newConductors = await Promise.all(newConductorsPromises);

  const allConductors = [...currentConductors, ...newConductors];

  await Promise.all(
    allConductors.map(async c => {
      const dnaHash = await c.registerDna(dnaTemplate);
      await c.installApp(dnaHash, null, null, '');
    })
  );

  return allConductors;
}

import Mail from '@ioc:Adonis/Addons/Mail';
import { Job } from '@adonisjs/queues/build/src/Job';
import Door from 'App/Models/Door';

export default class StateChangeAlert extends Job {
  public async handle({ door, lastState }: { door: Door, lastState: string }) {
    // Check if the state hasn't changed back after a certain amount of time
    const timeThreshold = 3600; // Time threshold in seconds (adjust as needed)
    const currentTime = new Date();
    const lastUpdateTime = new Date(door.updatedAt);

    const elapsedTime = (currentTime.getTime() - lastUpdateTime.getTime()) / 1000;

    if (elapsedTime > timeThreshold) {
      // Send email alert
      await Mail.send((message) => {
        message
          .to('recipient@example.com')
          .from('sender@example.com')
          .subject('State Not Changed Back Alert')
          .htmlView('emails.stateNotChanged', { door, lastState });
      });
    }
  }
}

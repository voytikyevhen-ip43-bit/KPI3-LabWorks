// contract/events/master-profile-updated.event.ts
export class MasterProfileUpdatedEvent {
  constructor(
    public readonly masterId: string,
    public readonly displayName: string,
    public readonly avatarUrl: string,
    public readonly updatedAt: Date,
  ) {}
}
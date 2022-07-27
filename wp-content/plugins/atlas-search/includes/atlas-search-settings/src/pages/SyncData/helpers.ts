import { SyncStatus } from './SyncData';
import { AlertVariant } from '../../components/Alert';

export function mapSyncStateToAlertVariant(syncStatus: SyncStatus) {
  switch (syncStatus) {
    case SyncStatus.Init: {
      return AlertVariant.Primary;
    }

    case SyncStatus.Pending: {
      return AlertVariant.Primary;
    }

    case SyncStatus.Completed: {
      return AlertVariant.Success;
    }

    case SyncStatus.Error: {
      return AlertVariant.Danger;
    }
  }
}

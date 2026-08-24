import { IconsService } from "../../../services/icons.service";

export function appInitializer(service: IconsService): () => Promise<any> {
  return () => service.initIcons();
}

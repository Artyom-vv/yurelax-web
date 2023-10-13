import { IconsService } from "src/app/services/icons.service";

export function appInitializer(service: IconsService): () => Promise<any> {
  return () => service.initIcons();
}

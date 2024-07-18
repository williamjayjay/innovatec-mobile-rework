import { rootEnv } from "@/@core/configs/rootEnv";
import axios from "axios";

 const _api = axios.create({
    baseURL: rootEnv.apiUrl,
  });

export const clientHttp = _api;

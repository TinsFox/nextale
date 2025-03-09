import { apiFetch } from "../api-fetch";

export async function getCategories() {
	return await apiFetch("api/categories");
}

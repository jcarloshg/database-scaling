import { z } from 'zod';
// Interface describing the environment variables structure
export interface IEnvs {
	// for node
	NODE_ENV: string;
	PORT: string;
	// for dbs
	POSTGRES_USER_east: string,
	POSTGRES_PASSWORD_east: string,
	POSTGRES_DB_east: string,
	POSTGRES_PORT_east: string,
	POSTGRES_HOST_east: string,
	POSTGRES_USER_west: string,
	POSTGRES_PASSWORD_west: string,
	POSTGRES_DB_west: string,
	POSTGRES_PORT_west: string,
	POSTGRES_HOST_west: string,
	POSTGRES_USER_europe: string,
	POSTGRES_PASSWORD_europe: string,
	POSTGRES_DB_europe: string,
	POSTGRES_PORT_europe: string,
	POSTGRES_HOST_europe: string,
	POSTGRES_USER_asia: string,
	POSTGRES_PASSWORD_asia: string,
	POSTGRES_DB_asia: string,
	POSTGRES_PORT_asia: string,
	POSTGRES_HOST_asia: string,

	[key: string]: string | undefined;
}

// Class that returns an instance of IEnvs without reading process.env
export class StaticEnvs {
	private static instance: StaticEnvs | null = null;
	private envs: IEnvs;

	// Zod schema for environment validation
	private static envSchema = z.object({
		// for node
		NODE_ENV: z.string().default('development'),
		PORT: z.string().default('3000'),
		// for dbs
		POSTGRES_USER_east: z.string(),
		POSTGRES_PASSWORD_east: z.string(),
		POSTGRES_DB_east: z.string(),
		POSTGRES_PORT_east: z.string(),
		POSTGRES_HOST_east: z.string(),
		POSTGRES_USER_west: z.string(),
		POSTGRES_PASSWORD_west: z.string(),
		POSTGRES_DB_west: z.string(),
		POSTGRES_PORT_west: z.string(),
		POSTGRES_HOST_west: z.string(),
		POSTGRES_USER_europe: z.string(),
		POSTGRES_PASSWORD_europe: z.string(),
		POSTGRES_DB_europe: z.string(),
		POSTGRES_PORT_europe: z.string(),
		POSTGRES_HOST_europe: z.string(),
		POSTGRES_USER_asia: z.string(),
		POSTGRES_PASSWORD_asia: z.string(),
		POSTGRES_DB_asia: z.string(),
		POSTGRES_PORT_asia: z.string(),
		POSTGRES_HOST_asia: z.string(),
	});

	private constructor() {
		try {
			this.envs = StaticEnvs.envSchema.parse(process.env);
		} catch (error) {
			console.error('Error loading environment variables:', error);
			throw error;
		}
	}

	static getInstance(): StaticEnvs {
		if (!StaticEnvs.instance) StaticEnvs.instance = new StaticEnvs();
		return StaticEnvs.instance;
	}

	getEnvs(): IEnvs {
		return this.envs;
	}

	getByKey(key: string): string | undefined {
		return this.envs[key];
	}
}

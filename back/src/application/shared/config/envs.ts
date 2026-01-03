import { z } from 'zod';
// Interface describing the environment variables structure
export interface IEnvs {
	NODE_ENV: string;
	PORT: string;
	POSTGRES_DB: string;
	POSTGRES_PORT: string;
	POSTGRES_USER: string;
	POSTGRES_PASSWORD: string;
	POSTGRES_URL: string;
	[key: string]: string | undefined;
}

// Class that returns an instance of IEnvs without reading process.env
export class StaticEnvs {
	private static instance: StaticEnvs | null = null;
	private envs: IEnvs;

	// Zod schema for environment validation
	private static envSchema = z.object({
		NODE_ENV: z.string().default('development'),
		PORT: z.string().default('3000'),
		POSTGRES_DB: z.string().default('post_db'),
		POSTGRES_PORT: z.string().default('5432'),
		POSTGRES_USER: z.string().default('admin'),
		POSTGRES_PASSWORD: z.string().default('123456'),
		POSTGRES_URL: z.string().default('post_db_us_east'),
	});

	private constructor() {
		try {
			this.envs = StaticEnvs.envSchema.parse(process.env);
			console.log(`Environment variables: `, this.envs);
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
}

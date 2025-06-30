type Page = {
	blocks: (
		| {
				type: 'Component1';
				params: {
					param1: boolean;
					param2: string;
					param3: number;
					booleanParam: boolean;
					stringParam: string;
					numberParam: number;
				};
		  }
		| { type: 'Component2'; params: ComponentProps }
	)[];
};

type ComponentProps = {
	paramBooleanRequired: boolean;
	paramNumber: number;
	paramStringRequired: string;
};

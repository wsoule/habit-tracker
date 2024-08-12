<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Accordian from '$lib/components/ui/accordion';

	let count = 0;

	const updateCount = (changeNum: number) => {
		count += changeNum;
	};
	const handleDecrement = () => updateCount(-1);
	const handleIncrement = () => updateCount(+1);
</script>

<div>
	<button on:click={handleDecrement}>-</button>
	<p>{count}</p>
	<button on:click={handleIncrement}>+</button>
</div>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Button>Click me</Button>
<Accordian.Root>
	<Accordian.Item value="item-1">
		<Accordian.Trigger>Is It accessible?</Accordian.Trigger>
		<Accordian.Content>Yes. It adheres bla bla bla.</Accordian.Content>
	</Accordian.Item>
</Accordian.Root>

<style>
	div {
		display: flex;
	}

	button {
		background: lightblue;
		border: solid blue;
		border-radius: 1em;
		width: 3em;
	}
</style>

<script>
	import '../app.css';
	
	let { children } = $props();
</script>

<svelte:head>
	<title>Citations</title>
	<meta name="description" content="Generate MLA 8 citations easily" />
</svelte:head>
<div class="min-h-screen bg-white dark:bg-slate-600">
{@render children()}
</div>


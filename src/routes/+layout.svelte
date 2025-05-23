<script>
	import '../app.css';
	
	let { children } = $props();
</script>


<div class="min-h-screen bg-white dark:bg-slate-600">
{@render children()}
</div>


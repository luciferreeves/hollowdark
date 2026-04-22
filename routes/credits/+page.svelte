<script lang="ts">
  import { goto } from '$app/navigation'
  import { resolve } from '$app/paths'
  import CreditsScreen from '@hollowdark/lib/screens/CreditsScreen.svelte'

  function handleBack(): void {
    goto(resolve('/'))
  }
</script>

<CreditsScreen onBack={handleBack} />

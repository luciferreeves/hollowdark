<script lang="ts">
  import { goto } from '$app/navigation'
  import { resolve } from '$app/paths'
  import SettingsScreen from '@hollowdark/lib/screens/SettingsScreen.svelte'

  function handleBack(): void {
    goto(resolve('/'))
  }
</script>

<SettingsScreen onBack={handleBack} />

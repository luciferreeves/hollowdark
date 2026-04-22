<script lang="ts">
  import { goto } from '$app/navigation'
  import { resolve } from '$app/paths'
  import SettingsScreen from '@hollowdark/lib/screens/SettingsScreen.svelte'

  function handleBack(): void {
    goto(resolve('/'))
  }

  function handleCredits(): void {
    goto(resolve('/credits'))
  }
</script>

<SettingsScreen onBack={handleBack} onCredits={handleCredits} />

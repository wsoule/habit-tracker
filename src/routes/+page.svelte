<script lang="ts">
  import * as Accordion from '$lib/components/ui/accordion';
</script>

<div class="container mx-auto py-12">
  <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    Build Lasting Habits with <em>Atomic Habits</em>
  </h1>
  <p class="mt-6 leading-7">
    In a world where small actions lead to extraordinary results, mastering your habits can
    transform your life. Inspired by the best-selling book <em>Atomic Habits</em> by James Clear, this
    app is designed to help you track, build, and maintain habits that will lead to success.
  </p>

  <h2
    class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
  >
    The Power of Tiny Gains
  </h2>
  <p class="mt-6 leading-7">
    Imagine improving by just 1% every day. It may seem insignificant, but over time, these tiny
    gains compound into remarkable changes. This app makes it easy to track those small, consistent
    actions that lead to big results.
  </p>
  <blockquote class="mt-6 border-l-2 pl-6 italic">
    "You do not rise to the level of your goals. You fall to the level of your systems." — James
    Clear
  </blockquote>

  <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">How It Works</h3>
  <p class="mt-6 leading-7">
    The Habit Tracker is built on the simple yet powerful idea of making incremental improvements.
    Here’s how it works:
  </p>
  <ul class="my-6 ml-6 list-disc">
    <li>Identify key habits: Choose small, actionable habits that align with your goals.</li>
    <li>Track progress: Monitor your habits daily, building streaks and consistency.</li>
    <li>Reflect and adjust: Review your progress regularly to refine and optimize your habits.</li>
  </ul>

  <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">Success Stories</h3>
  <p class="mt-6 leading-7">
    Our users have transformed their lives through consistent habit tracking. From building a
    morning routine to maintaining fitness goals, the Habit Tracker has been the catalyst for
    lasting change.
  </p>

  <div class="my-6 w-full overflow-y-auto">
    <table class="w-full">
      <thead>
        <tr class="m-0 border-t p-0 even:bg-muted">
          <th class="border px-4 py-2 text-left font-bold"> Before Using the App </th>
          <th class="border px-4 py-2 text-left font-bold"> After Using the App </th>
        </tr>
      </thead>
      <tbody>
        <tr class="m-0 border-t p-0 even:bg-muted">
          <td class="border px-4 py-2">Inconsistent habits</td>
          <td class="border px-4 py-2">Daily routines</td>
        </tr>
        <tr class="m-0 border-t p-0 even:bg-muted">
          <td class="border px-4 py-2">Unclear goals</td>
          <td class="border px-4 py-2">Focused and actionable steps</td>
        </tr>
        <tr class="m-0 border-t p-0 even:bg-muted">
          <td class="border px-4 py-2">Overwhelmed by change</td>
          <td class="border px-4 py-2">Empowered by progress</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p class="mt-6 leading-7">
    Join thousands of users who have already started their journey towards better habits. Remember,
    the key to success is not willpower but building effective systems.
  </p>

  <p class="mt-6 leading-7">
    Ready to get started? Let's build habits that stick, one tiny action at a time.
  </p>

  <!-- Accordion for Pages -->
  <Accordion.Root class="mt-12">
    <Accordion.Item value="todo-page">
      <Accordion.Trigger class="text-xl font-semibold">Todo Page</Accordion.Trigger>
      <Accordion.Content>
        <p class="mt-4 leading-7">
          The Todo page shows your current tasks for the day, alongside the good habits that you
          need to complete. It’s designed to help you focus on what’s important each day, ensuring
          that you stay on track with your goals.
        </p>
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="scorecard-page" class="mt-6">
      <Accordion.Trigger class="text-xl font-semibold">Scorecard Page</Accordion.Trigger>
      <Accordion.Content>
        <p class="mt-4 leading-7">
          The Scorecard page helps you become more self-aware by tracking your daily habits.
          Inspired by the "Habits Scorecard" method from <em>Atomic Habits</em>, this tool allows
          you to input your daily habits and categorize them as good, bad, or neutral. Here's how to
          use it:
        </p>

        <h4 class="mt-6 text-lg font-semibold">Step 1: Input and Categorize Your Daily Habits</h4>
        <p class="leading-7">
          On the <a href="/scorecard" class="font-medium text-primary underline underline-offset-4"
            >Scorecard page</a
          >, start by entering each habit you perform throughout the day. For each habit, you can
          choose a category:
        </p>
        <ul class="my-4 ml-6 list-disc">
          <li><b>Good</b> for habits that reinforce your desired identity.</li>
          <li><b>Bad</b> for habits that conflict with your desired identity.</li>
          <li><b>Neutral</b> for habits that neither help nor hinder your goals.</li>
        </ul>

        <h4 class="mt-6 text-lg font-semibold">Example: Morning Routine</h4>
        <p class="leading-7">
          - <b>Habit</b>: Wake up <br />
          - <b>Category</b>: Neutral<br />
          <br />
          - <b>Habit</b>: Turn off alarm <br />
          - <b>Category</b>: Neutral<br />
          <br />
          - <b>Habit</b>: Make the bed <br />
          - <b>Category</b>: Good<br />
          <br />
          - <b>Habit</b>: Check phone immediately <br />
          - <b>Category</b>: Bad
        </p>

        <h4 class="mt-6 text-lg font-semibold">Step 2: Reflect Without Judgment</h4>
        <p class="leading-7">
          The purpose of the Scorecard is to bring awareness to your daily habits. There’s no need
          to change anything immediately. Just notice the patterns and behaviors that make up your
          day.
        </p>

        <h4 class="mt-6 text-lg font-semibold">Example: Evening Routine</h4>
        <p class="leading-7">
          - <b>Habit</b>: Eat dinner while watching TV <br />
          - <b>Category</b>: Neutral<br />
          <br />
          - <b>Habit</b>: Brush teeth <br />
          - <b>Category</b>: Good<br />
          <br />
          - <b>Habit</b>: Stay up late browsing social media <br />
          - <b>Category</b>: Bad
        </p>

        <p class="mt-6 leading-7">
          Use this Scorecard regularly to monitor your habits, and over time, you'll naturally start
          making adjustments to align your daily actions with the person you wish to become.
        </p>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</div>

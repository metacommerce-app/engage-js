import Engage from '@metacommerce-app/engage-js';

const engage = new Engage();

// API_KEY=id8lpuaGOFaRt3frPFvqW76fmVLJJdBI1g9XYsMY
// SOURCE_URL=http://localhost:3000
// THRUSTERS_URL=http://localhost:8050

engage.initialize({
  apiKey: 'hWk6WwN4CG507Nr1rzLLfx7OZTJStLR7WxUXy8N7',
  url: 'http://localhost:8050',
});

export default engage;

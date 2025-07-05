import React from 'react'
import { Avatar, LiquidAvatar, RippleAvatar } from '../src/components'

const AvatarExample = () => {
  return (
    <div className="p-8 bg-[rgb(250,249,245)] min-h-screen">
      <h1 className="text-4xl font-bold text-stone-800 mb-8">Avatar Components</h1>
      
      {/* Standard Avatar */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-stone-700 mb-6">Standard Avatar</h2>
        
        {/* Sizes */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-stone-600 mb-4">Sizes</h3>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <Avatar size="xs" initials="XS" />
              <p className="text-sm text-stone-500 mt-2">XS</p>
            </div>
            <div className="text-center">
              <Avatar size="sm" initials="SM" />
              <p className="text-sm text-stone-500 mt-2">SM</p>
            </div>
            <div className="text-center">
              <Avatar size="md" initials="MD" />
              <p className="text-sm text-stone-500 mt-2">MD</p>
            </div>
            <div className="text-center">
              <Avatar size="lg" initials="LG" />
              <p className="text-sm text-stone-500 mt-2">LG</p>
            </div>
            <div className="text-center">
              <Avatar size="xl" initials="XL" />
              <p className="text-sm text-stone-500 mt-2">XL</p>
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-stone-600 mb-4">Variants</h3>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <Avatar 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                alt="John Doe"
                status="online"
              />
              <p className="text-sm text-stone-500 mt-2">Image</p>
            </div>
            <div className="text-center">
              <Avatar initials="JD" status="away" />
              <p className="text-sm text-stone-500 mt-2">Initials</p>
            </div>
            <div className="text-center">
              <Avatar 
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                }
                status="busy"
              />
              <p className="text-sm text-stone-500 mt-2">Icon</p>
            </div>
            <div className="text-center">
              <Avatar status="offline" />
              <p className="text-sm text-stone-500 mt-2">Default</p>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-stone-600 mb-4">Status Indicators</h3>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <Avatar initials="ON" status="online" />
              <p className="text-sm text-stone-500 mt-2">Online</p>
            </div>
            <div className="text-center">
              <Avatar initials="AW" status="away" />
              <p className="text-sm text-stone-500 mt-2">Away</p>
            </div>
            <div className="text-center">
              <Avatar initials="BS" status="busy" />
              <p className="text-sm text-stone-500 mt-2">Busy</p>
            </div>
            <div className="text-center">
              <Avatar initials="OF" status="offline" />
              <p className="text-sm text-stone-500 mt-2">Offline</p>
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-stone-600 mb-4">Additional Options</h3>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <Avatar initials="BD" border />
              <p className="text-sm text-stone-500 mt-2">With Border</p>
            </div>
            <div className="text-center">
              <Avatar initials="SQ" square />
              <p className="text-sm text-stone-500 mt-2">Square</p>
            </div>
            <div className="text-center">
              <Avatar 
                initials="CL" 
                onClick={() => alert('Avatar clicked!')}
                className="cursor-pointer"
              />
              <p className="text-sm text-stone-500 mt-2">Clickable</p>
            </div>
          </div>
        </div>
      </section>

      {/* Liquid Avatar */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-stone-700 mb-6">Liquid Avatar</h2>
        <p className="text-stone-600 mb-6">
          Interactive avatars with liquid transitions and mouse tracking effects. Hover to see the morphing border and glow effects.
        </p>
        
        <div className="flex items-center gap-8">
          <div className="text-center">
            <LiquidAvatar 
              src="https://images.unsplash.com/photo-1494790108755-2616b612b734?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
              alt="Sarah Wilson"
              size="lg"
              status="online"
            />
            <p className="text-sm text-stone-500 mt-2">Image</p>
          </div>
          <div className="text-center">
            <LiquidAvatar 
              initials="MW" 
              size="lg"
              status="away"
              onClick={() => alert('Liquid avatar clicked!')}
            />
            <p className="text-sm text-stone-500 mt-2">Initials</p>
          </div>
          <div className="text-center">
            <LiquidAvatar 
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="10" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
              size="lg"
              status="busy"
            />
            <p className="text-sm text-stone-500 mt-2">Icon</p>
          </div>
          <div className="text-center">
            <LiquidAvatar 
              square
              initials="SQ"
              size="lg"
              status="online"
            />
            <p className="text-sm text-stone-500 mt-2">Square</p>
          </div>
        </div>
      </section>

      {/* Ripple Avatar */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-stone-700 mb-6">Ripple Avatar</h2>
        <p className="text-stone-600 mb-6">
          Interactive avatars with ripple effects. Click to create ripples that expand from the click point.
        </p>
        
        <div className="flex items-center gap-8">
          <div className="text-center">
            <RippleAvatar 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
              alt="Alex Johnson"
              size="lg"
              status="online"
              onClick={() => console.log('Ripple avatar clicked!')}
            />
            <p className="text-sm text-stone-500 mt-2">Image</p>
          </div>
          <div className="text-center">
            <RippleAvatar 
              initials="RT" 
              size="lg"
              status="away"
              onClick={() => console.log('Ripple avatar clicked!')}
            />
            <p className="text-sm text-stone-500 mt-2">Initials</p>
          </div>
          <div className="text-center">
            <RippleAvatar 
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              }
              size="lg"
              status="busy"
              onClick={() => console.log('Ripple avatar clicked!')}
            />
            <p className="text-sm text-stone-500 mt-2">Icon</p>
          </div>
          <div className="text-center">
            <RippleAvatar 
              square
              initials="SQ"
              size="lg"
              status="online"
              onClick={() => console.log('Ripple avatar clicked!')}
            />
            <p className="text-sm text-stone-500 mt-2">Square</p>
          </div>
        </div>
      </section>

      {/* Group Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-stone-700 mb-6">Group Examples</h2>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium text-stone-600 mb-4">Avatar Stack</h3>
          <div className="flex -space-x-2">
            <Avatar 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
              border
              status="online"
            />
            <Avatar 
              src="https://images.unsplash.com/photo-1494790108755-2616b612b734?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
              border
              status="away"
            />
            <Avatar 
              initials="AB"
              border
              status="busy"
            />
            <Avatar 
              initials="+2"
              border
              fallbackColor="#6b7280"
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-medium text-stone-600 mb-4">Team List</h3>
          <div className="space-y-4">
            {[
              { name: 'John Doe', role: 'Frontend Developer', status: 'online' as const, initials: 'JD' },
              { name: 'Sarah Wilson', role: 'UI/UX Designer', status: 'away' as const, initials: 'SW' },
              { name: 'Mike Johnson', role: 'Backend Developer', status: 'busy' as const, initials: 'MJ' },
              { name: 'Emily Davis', role: 'Product Manager', status: 'offline' as const, initials: 'ED' }
            ].map((member) => (
              <div key={member.name} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <Avatar 
                  initials={member.initials}
                  status={member.status}
                  size="md"
                />
                <div>
                  <p className="font-medium text-stone-800">{member.name}</p>
                  <p className="text-sm text-stone-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AvatarExample 
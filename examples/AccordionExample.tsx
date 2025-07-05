import React, { useState } from 'react'
import { Accordion, LiquidAccordion, createAccordionItem } from '../src/components'

export const AccordionExample: React.FC = () => {

  const basicItems = [
    createAccordionItem('1', 'What is your return policy?', 
      <div className="space-y-2">
        <p>We offer a 30-day return policy for all items in original condition.</p>
        <p>Items must be returned with original packaging and tags attached.</p>
      </div>
    ),
    createAccordionItem('2', 'How long does shipping take?', 
      <div className="space-y-2">
        <p>Standard shipping takes 5-7 business days.</p>
        <p>Express shipping options are available for 1-3 business days.</p>
      </div>
    ),
    createAccordionItem('3', 'Do you offer international shipping?', 
      <div className="space-y-2">
        <p>Yes, we ship to over 100 countries worldwide.</p>
        <p>International shipping rates and times vary by location.</p>
      </div>
    ),
    createAccordionItem('4', 'How can I track my order?', 
      <div className="space-y-2">
        <p>You'll receive a tracking number via email once your order ships.</p>
        <p>You can also track your order in your account dashboard.</p>
      </div>
    ),
  ]

  const featureItems = [
    createAccordionItem('f1', '🎨 Design Features', 
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-sage-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <p className="font-medium text-stone-700">Organic Modernism</p>
            <p className="text-stone-600">Natural shapes meet precise geometric elements</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-sage-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <p className="font-medium text-stone-700">Layered Depth</p>
            <p className="text-stone-600">Subtle shadows and elevation without heaviness</p>
          </div>
        </div>
      </div>
    ),
    createAccordionItem('f2', '⚡ Performance Benefits', 
      <div className="space-y-3">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-medium text-green-800">Fast Loading</p>
            <p className="text-green-700 text-sm">Optimized for speed</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-medium text-blue-800">Responsive</p>
            <p className="text-blue-700 text-sm">Works on all devices</p>
          </div>
        </div>
      </div>
    ),
    createAccordionItem('f3', '🔧 Technical Specifications', 
      <div className="space-y-3">
        <div className="bg-stone-50 p-4 rounded-lg">
          <code className="text-sm text-stone-700">
            Framework: React + TypeScript<br/>
            Styling: TailwindCSS<br/>
            Testing: Jest + React Testing Library<br/>
            Build: Vite
          </code>
        </div>
      </div>
    ),
  ]

  const handleToggle = (id: string, isOpen: boolean) => {
    console.log(`Accordion item ${id} is now ${isOpen ? 'open' : 'closed'}`)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-stone-800 mb-6">Accordion Components</h2>
      
      {/* Standard Accordion */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-stone-700">Standard Accordion</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-3">Default Variant</h4>
            <Accordion 
              items={basicItems}
              onToggle={handleToggle}
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-3">Bordered Variant</h4>
            <Accordion 
              items={basicItems.slice(0, 3)}
              variant="bordered"
              allowMultiple
              defaultOpen={['1']}
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-3">Filled Variant</h4>
            <Accordion 
              items={basicItems.slice(0, 3)}
              variant="filled"
              size="lg"
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-3">Ghost Variant</h4>
            <Accordion 
              items={basicItems.slice(0, 3)}
              variant="ghost"
              size="sm"
            />
          </div>
        </div>
      </section>

      {/* Liquid Accordion */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-stone-700">Liquid Accordion</h3>
        <p className="text-stone-600">Move your mouse over the accordion items to see the liquid tracking effects!</p>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-3">Bordered Liquid</h4>
            <LiquidAccordion 
              items={featureItems}
              variant="bordered"
              allowMultiple
              defaultOpen={['f1']}
              onToggle={handleToggle}
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-3">Glass Liquid</h4>
            <LiquidAccordion 
              items={featureItems.slice(0, 2)}
              variant="glass"
              size="lg"
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-3">Filled Liquid</h4>
            <LiquidAccordion 
              items={featureItems.slice(1, 3)}
              variant="filled"
              size="md"
            />
          </div>
        </div>
      </section>

      {/* Multiple Expansion Example */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-stone-700">Multiple Expansion</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-3">Single Expansion (Default)</h4>
            <Accordion 
              items={basicItems.slice(0, 3)}
              variant="bordered"
              allowMultiple={false}
              defaultOpen={['1']}
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-3">Multiple Expansion</h4>
            <Accordion 
              items={basicItems.slice(0, 3)}
              variant="bordered"
              allowMultiple={true}
              defaultOpen={['1', '2']}
            />
          </div>
        </div>
      </section>


    </div>
  )
} 